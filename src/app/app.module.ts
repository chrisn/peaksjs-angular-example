import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WaveformViewComponent } from './waveform-view/waveform-view.component';
import { SegmentsListComponent } from './segments-list/segments-list.component';
import { PointsListComponent } from './points-list/points-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WaveformViewComponent,
    SegmentsListComponent,
    PointsListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { };
