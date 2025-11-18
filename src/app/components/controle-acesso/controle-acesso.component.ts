import { Component, Input } from '@angular/core';
import { LucideAngularModule, LockIcon,LockOpenIcon } from 'lucide-angular';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-controle-acesso',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './controle-acesso.component.html',
  styleUrl: './controle-acesso.component.scss'
})
export class ControleAcessoComponent {
  readonly lockIcon = LockIcon;
  readonly lockOpenIcon = LockOpenIcon;
  
  @Input() locks: any[] = [
    { id: 1, name: 'Porta da Frente', locked: true },
    { id: 2, name: 'Porta dos Fundos', locked: false },
    { id: 3, name: 'Porta da Garagem', locked: true }
  ];
  @Input() toggleLock!: (id: number) => void;


}
