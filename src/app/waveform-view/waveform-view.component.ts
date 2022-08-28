import { AfterViewInit, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import Peaks, { PeaksInstance, PeaksOptions } from 'peaks.js';

import ExampleAudio from '../example-audio';

import { createPointMarker, createSegmentMarker } from './marker-factories';
import { createSegmentLabel } from './segment-label-factory';

@Component({
  selector: 'waveform-view',
  templateUrl: './waveform-view.component.html',
  styleUrls: ['./waveform-view.component.css']
})
export class WaveformViewComponent implements AfterViewInit {

  @Input() selectedAudio: ExampleAudio = {} as ExampleAudio;
  @ViewChild("zoomviewContainer") zoomview: ElementRef = {} as ElementRef;
  @ViewChild("overviewContainer") overview: ElementRef = {} as ElementRef;
  @ViewChild("audio") audioElement: ElementRef = {} as ElementRef;
  peaks?: PeaksInstance;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initPeaks();
  }

  initPeaks() {
    const options: PeaksOptions = {
      zoomview: {
        container: this.zoomview.nativeElement
      },
      overview: {
        container: this.overview.nativeElement
      },
      mediaElement: this.audioElement.nativeElement,
      keyboard: true,
      createSegmentMarker: createSegmentMarker,
      createSegmentLabel: createSegmentLabel,
      createPointMarker: createPointMarker
    };

    if (this.selectedAudio.waveformDataUrl) {
      options.dataUri = {
        arraybuffer: this.selectedAudio.waveformDataUrl
      };
    }

    this.audioElement.nativeElement.src = this.selectedAudio.audioUrl;

    this.destroyPeaks();

    Peaks.init(options, (err, peaks) => {
      if (err) {
        console.error(err);
        return;
      }

      this.peaks = peaks;
      this.onPeaksReady();
    });
  }

  ngOnDestroy(): void {
    this.destroyPeaks();
  }

  destroyPeaks(): void {
    if (this.peaks) {
      this.peaks.destroy();
      this.peaks = undefined;
    }
  }

  onPeaksReady(): void {
    console.log('Peaks ready');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.audioElement.nativeElement) {
      return;
    }

    const audioChange = changes['selectedAudio'];

    if (audioChange) {
      if (!audioChange.previousValue ||
          audioChange.currentValue.audioUrl !== audioChange.previousValue.audioUrl) {
        this.selectedAudio = audioChange.currentValue;
        this.initPeaks();
      }
    }
  }

  zoomIn(): void {
    if (this.peaks) {
      this.peaks.zoom.zoomIn();
    }
  }

  zoomOut(): void {
    if (this.peaks) {
      this.peaks.zoom.zoomOut();
    }
  }

  addSegment(): void {
    if (this.peaks) {
      const time = this.peaks.player.getCurrentTime();

      this.peaks.segments.add({
        startTime: time,
        endTime: time + 10,
        labelText: 'Test Segment',
        editable: true
      });
    }
  }

  addPoint(): void {
    if (this.peaks) {
      const time = this.peaks.player.getCurrentTime();

      this.peaks.points.add({
        time: time,
        labelText: 'Test Point',
        editable: true
      });
    }
  }

  logMarkers(): void {
    console.log('log markers');

    // if (this.peaks) {
    //   this.props.setSegments(this.peaks.segments.getSegments());
    //   this.props.setPoints(this.peaks.points.getPoints());
    // }
  }
}
