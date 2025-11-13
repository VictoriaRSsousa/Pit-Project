import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sensor.component.html'
})
export class SensorComponent {
  @Input() presenceDetected = false;
}
