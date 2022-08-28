import { Component } from '@angular/core';
import { Point, Segment } from 'peaks.js';

import ExampleAudio from './example-audio';

const audioUrls: ExampleAudio[] = [
  {
    id: 1,
    name: 'Bird song',
    audioUrl: 'assets/07030039.mp3',
    audioContentType: 'audio/mpeg',
    waveformDataUrl: 'assets/07030039.dat'
  },

  {
    id: 2,
    name: 'Car passing',
    audioUrl: 'assets/07023003.mp3',
    audioContentType: 'audio/mpeg',
    waveformDataUrl: 'assets/07023003-2channel.dat'
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  exampleAudio: ExampleAudio[] = audioUrls;
  selectedAudio: ExampleAudio = audioUrls[0];

  segments: Segment[] = [];
  points: Point[] = [];

  onSelect(audio: ExampleAudio): void {
    this.selectedAudio = audio;
  }

  updateSegments(segments: Segment[]) {
    this.segments = segments;
  }

  updatePoints(points: Point[]) {
    this.points = points;
  }
}
