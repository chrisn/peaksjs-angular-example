import { Component } from '@angular/core';
import Peaks, { PeaksInstance, PeaksOptions } from 'peaks.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Peaks.js Angular Example';

  ngOnInit() {
    const options: PeaksOptions = {
      zoomview: {
        container: document.getElementById('zoomview-container')
      },
      overview: {
        container: document.getElementById('overview-container')
      },
      mediaElement: document.getElementById('audio')!,
      dataUri: {
        arraybuffer: 'assets/07030039.dat'
      }
    };

    Peaks.init(options, function(err: Error, peaks?: PeaksInstance) {
      console.log('Peaks ready');
    });
  }
}
