import { Component, Input } from '@angular/core';

import { Segment } from 'peaks.js';

@Component({
  selector: 'segments-list',
  templateUrl: './segments-list.component.html',
  styleUrls: ['./segments-list.component.css']
})
export class SegmentsListComponent {
  @Input() segments: Segment[] = [];
}
