import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services & Models
import { ApiService } from '../../services/api.service';
import { CameraService, Camera } from '../../services/camera.service';
import { SensorData } from '../../models/sensor-data.model';
import { WebSocketService } from '../../services/web-socket.service';

// Components
import { SensorComponent } from '../../components/sensor/sensor.component';
import { CameraComponent } from '../../components/camera/camera.component';
import { ControleAcessoComponent } from '../../components/controle-acesso/controle-acesso.component';
import { GraficoComponent } from '../../components/grafico/grafico.component';
import { FireSystemComponent } from '../../components/fire-system/fire-system.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SensorComponent,
    CameraComponent,
    ControleAcessoComponent,
    GraficoComponent,
    FireSystemComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  dados: SensorData | null = null;

  cameras: Camera[] = [];
  cameraSelecionada!: Camera;

  constructor(
    private api: ApiService,
    private ws: WebSocketService,
    private cameraService: CameraService
  ) {}

  // ---------------- INIT ----------------

  ngOnInit(): void {
    // Estado inicial (HTTP)
    this.api.getData().subscribe(data => {
      this.dados = data;
    });

    // Sensores em tempo real (WebSocket)
    this.ws.listen().subscribe(wsData => {
      if (!this.dados) return;

      this.dados = {
        ...this.dados,
          ...wsData 
        };
    });


    // Inicializar câmeras
    this.cameras = this.cameraService.getCameras();
    this.selecionarCamera(1);
  }

  // ---------------- SIMULAÇÕES ----------------

  /** 🔥 Simula incêndio (temperatura alta por 20s na ESP32) */
  simularTemperatura(temp: number): void {
    if (!this.dados) return;

    // UI reage na hora
    this.dados = {
      ...this.dados,
      temperatura: temp,
      incendio: true
    };

    this.api.simularTemperatura({
      ativo: true,
      temperatura: temp
    }).subscribe();
        
    this.api.getData().subscribe(data => {
      this.dados = data;
    });
  }

  /** 👤 Simula presença (liga câmera por 20s na ESP32) */
  simularPresenca(presente: boolean): void {
    if (!this.dados) return;

    // Atualização otimista
    this.dados = {
      ...this.dados,
      presenca: presente,
      camera: presente
    };

    this.api.simularPresenca({
      ativo: true,
      presenca: presente
    }).subscribe({
      error: () => {
        // rollback simples
        this.dados = {
          ...this.dados!,
          presenca: !presente,
          camera: !presente
        };
      }
    });
  }

  // ---------------- CONTROLES ----------------

  alternarPorta(): void {
    if (!this.dados) return;

    const novoEstado = !this.dados.portaProducao;

    this.dados = {
      ...this.dados,
      portaProducao: novoEstado
    };

    this.api.controlarPorta(novoEstado).subscribe({
      error: () => this.rollback('portaProducao', !novoEstado)
    });
  }

  alternarCamera(): void {
    if (!this.dados) return;

    const novoEstado = !this.dados.camera;

    this.dados = {
      ...this.dados,
      camera: novoEstado
    };

    this.api.controlarCamera(novoEstado).subscribe({
      error: () => this.rollback('camera', !novoEstado)
    });
  }

  alternarIncendio(): void {
    if (!this.dados) return;

    const novoEstado = !this.dados.incendio;

    this.dados = {
      ...this.dados,
      incendio: novoEstado
    };

    this.api.controlarIncendio(novoEstado).subscribe({
      error: () => this.rollback('incendio', !novoEstado)
    });
  }

  // ---------------- CÂMERAS ----------------

  selecionarCamera(id: number): void {
    this.cameraService.selecionarCamera(id);
    this.cameraSelecionada = this.cameraService.getCameraSelecionada();
  }

  // ---------------- UTIL ----------------

  private rollback(
    campo: keyof Pick<SensorData, 'portaProducao' | 'camera' | 'incendio'>,
    valor: boolean
  ) {
    if (!this.dados) return;

    this.dados = {
      ...this.dados,
      [campo]: valor
    };
  }

  updatePresence(event: boolean) {
    // usado só para mock local (se precisar)
    console.log('Presença MOCK', event);
  }
}
