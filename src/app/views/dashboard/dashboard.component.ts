import { Component } from '@angular/core';
import { SensorComponent } from '../../components/sensor/sensor.component';
import { CameraComponent } from '../../components/camera/camera.component';
import { ControleAcessoComponent } from '../../components/controle-acesso/controle-acesso.component';
import { GraficoComponent } from '../../components/grafico/grafico.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SensorComponent, CameraComponent, ControleAcessoComponent, GraficoComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    presenceDetected = false;

  locks = [
    { id: 1, name: 'Porta da Frente', locked: true },
    { id: 2, name: 'Porta dos Fundos', locked: false },
    { id: 3, name: 'Porta da Garagem', locked: true }
  ];

  toggleLock(id: number) {
    const lock = this.locks.find(l => l.id === id);
    if (lock) {
      lock.locked = !lock.locked;
    }
  }
}
