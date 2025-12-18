import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FlameIcon } from 'lucide-angular';

@Component({
  selector: 'app-fire-system',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './fire-system.component.html',
  styleUrls: ['./fire-system.component.scss'],
})
export class FireSystemComponent {
  @Input() incendioAtivo: boolean = false;
  @Output() alternarIncendio = new EventEmitter<void>();

  readonly flameIcon = FlameIcon;

  onClick() {
    this.alternarIncendio.emit();
  }
}
