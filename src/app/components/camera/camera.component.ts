import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './camera.component.html'
})
export class CameraComponent implements OnChanges {

  @Input() cameraActive = false;
  @Input() videoUrl: string = '';

  readonly videoIcon = VideoIcon;

  // src real da imagem
  imageSrc: string | null = null;

  ngOnChanges(changes: SimpleChanges) {

    if (changes['cameraActive'] && this.cameraActive) {
      this.ativarCamera();
    }

    if (changes['cameraActive'] && !this.cameraActive) {
      this.desativarCamera();
    }

    if (changes['videoUrl'] && this.cameraActive) {
      this.ativarCamera();
    }
  }

  ativarCamera() {
    if (!this.videoUrl) return;

    this.imageSrc = `${this.videoUrl}?t=${Date.now()}`;
  }

  desativarCamera() {
    this.imageSrc = null;
  }
}
