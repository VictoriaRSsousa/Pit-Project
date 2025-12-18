import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, LockIcon, LockOpenIcon } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-controle-acesso',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './controle-acesso.component.html',
  styleUrls: ['./controle-acesso.component.scss'],
})
export class ControleAcessoComponent {
  readonly lockIcon = LockIcon;
  readonly lockOpenIcon = LockOpenIcon;

  @Input({ required: true }) portaTrancada!: boolean;
  @Output() alternarPorta = new EventEmitter<void>();

  get statusTexto(): string {
    return this.portaTrancada ? 'Trancada' : 'Aberta';
  }

  get statusClasse(): string {
    return this.portaTrancada ? 'text-red-500' : 'text-green-500';
  }

  onClick() {
    this.alternarPorta.emit();
  }
}
