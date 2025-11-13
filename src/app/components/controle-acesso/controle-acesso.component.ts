import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-controle-acesso',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './controle-acesso.component.html',
  styleUrl: './controle-acesso.component.scss'
})
export class ControleAcessoComponent {
  @Input() locks: any[] = [];
  @Input() toggleLock!: (id: number) => void;
}
