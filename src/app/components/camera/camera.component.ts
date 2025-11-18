import { Component } from '@angular/core';
import { LucideAngularModule, VideoIcon } from 'lucide-angular';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './camera.component.html'
})
export class CameraComponent {
  readonly videoIcon = VideoIcon;
}
