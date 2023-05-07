import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformViewComponent } from './waveform-view.component';

describe('WaveformViewComponent', () => {
  let component: WaveformViewComponent;
  let fixture: ComponentFixture<WaveformViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaveformViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaveformViewComponent);
    component = fixture.componentInstance;
    component.selectedAudio = {
      id: 1,
      name: 'Bird song',
      audioUrl: 'assets/07030039.mp3',
      audioContentType: 'audio/mpeg',
      waveformDataUrl: 'assets/07030039.dat'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
