import { Injectable } from '@angular/core';

export interface Camera {
  id: number;
  nome: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private cameras: Camera[] = [
    { id: 1, nome: 'Produção', url: 'http://192.0.0.4:8080/video' },
    { id: 2, nome: 'Entrada', url: 'http://192.168.0.70:8080/video' },
  ];

  private storageKey = 'cameraSelecionadaId';

  getCameras(): Camera[] {
    return this.cameras;
  }

  getCameraSelecionada(): Camera {
    const idSalvo = Number(localStorage.getItem(this.storageKey));
    return this.cameras.find(c => c.id === idSalvo) || this.cameras[0];
  }

  selecionarCamera(id: number) {
    localStorage.setItem(this.storageKey, id.toString());
  }
}
