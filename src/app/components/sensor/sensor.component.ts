import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule, RadarIcon, ActivityIcon, CircleAlertIcon } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sensor.component.html'
})
export class SensorComponent {

  @Input() presenceDetected: boolean = false;
  @Output() presenceChanged = new EventEmitter<boolean>();

  readonly personStandingIcon = CircleAlertIcon;
  readonly radarIcon = RadarIcon;
}
