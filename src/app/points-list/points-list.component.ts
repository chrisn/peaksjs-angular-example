import { Component, Input } from '@angular/core';
import { Point } from 'peaks.js';

@Component({
  selector: 'points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.css']
})
export class PointsListComponent {
  @Input() points: Point[] = [];
}
