import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { SensorData } from '../models/sensor-data.model';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<SensorData>;

  constructor() {
    this.socket$ = webSocket<SensorData>('ws://10.137.236.58:81');
  }

  listen(): Observable<SensorData> {
    return this.socket$.asObservable();
  }
}
