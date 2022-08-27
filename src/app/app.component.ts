import { Component } from '@angular/core';

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
  audio: ExampleAudio = audioUrls[0];
  selectedAudio: ExampleAudio = audioUrls[0];

  onSelect(audio: ExampleAudio): void {
    this.selectedAudio = audio;
  }
}
