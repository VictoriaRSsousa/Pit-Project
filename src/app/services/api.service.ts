import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorData } from '../models/sensor-data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly BASE_URL = 'http://10.137.236.58';

  constructor(private http: HttpClient) {}

  getData(): Observable<SensorData> {
    return this.http.get<SensorData>(`${this.BASE_URL}/data`);
  }

  controlarPorta(trancada: boolean): Observable<any> {
    return this.http.post(`${this.BASE_URL}/porta`, { trancada });
  }

  controlarIncendio(ativo: boolean): Observable<any> {
    return this.http.post(`${this.BASE_URL}/incendio`, { ativo });
  }

  controlarCamera(ativa: boolean): Observable<any> {
    return this.http.post(`${this.BASE_URL}/camera`, { ativa });
  }

  simularTemperatura(payload: {
    ativo: boolean;
    temperatura: number;
  }): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(
      `${this.BASE_URL}/simulacao/temperatura`,
      payload
    );
  }

  simularPresenca(payload: {
    ativo: boolean;
    presenca: boolean;
  }): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(
      `${this.BASE_URL}/simulacao/presenca`,
      payload
    );
  }

}
