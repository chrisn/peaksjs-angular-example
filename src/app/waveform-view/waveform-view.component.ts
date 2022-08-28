import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import Peaks, {
  PeaksInstance,
  PeaksOptions,
  Point,
  SetSourceOptions,
  Segment
} from 'peaks.js';

import ExampleAudio from '../example-audio';

import { createPointMarker, createSegmentMarker } from './marker-factories';
import { createSegmentLabel } from './segment-label-factory';

@Component({
  selector: 'waveform-view',
  templateUrl: './waveform-view.component.html',
  styleUrls: ['./waveform-view.component.css']
})
export class WaveformViewComponent implements AfterViewInit {
  @Input() selectedAudio!: ExampleAudio;
  @Output() segmentsEmitter = new EventEmitter<Segment[]>();
  @Output() pointsEmitter = new EventEmitter<Point[]>();

  @ViewChild("zoomviewContainer") zoomview!: ElementRef;
  @ViewChild("overviewContainer") overview!: ElementRef;
  @ViewChild("audio") audioElement!: ElementRef;
  peaks?: PeaksInstance;

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
    if (this.peaks) {
      this.peaks.destroy();
      this.peaks = undefined;
    }
  }

  onPeaksReady(): void {
    // Do something when the Peaks instance is ready for use
    console.log("Peaks.js is ready");
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.audioElement) {
      return;
    }

    const audioChange = changes['selectedAudio'];

    if (audioChange) {
      if (!audioChange.previousValue ||
          audioChange.currentValue.audioUrl !== audioChange.previousValue.audioUrl) {
        this.selectedAudio = audioChange.currentValue;

        if (this.peaks) {
          const options: SetSourceOptions = {
            mediaUrl: audioChange.currentValue.audioUrl,
            dataUri: {
              arraybuffer: audioChange.currentValue.waveformDataUrl
            }
          };

          this.peaks.setSource(options, (error: Error) => {
            if (error) {
              console.error(error);
            }
          });
        }
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
    if (this.peaks) {
      this.segmentsEmitter.emit(this.peaks.segments.getSegments());
      this.pointsEmitter.emit(this.peaks.points.getPoints());
    }
  }
}
