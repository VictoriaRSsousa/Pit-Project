import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.scss'
})
export class GraficoComponent implements AfterViewInit{
@ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    // cria o gráfico
new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      '00h', '02h', '04h', '06h', '08h', '10h',
      '12h', '14h', '16h', '18h', '20h', '22h'
    ],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [20, 19, 18, 18, 21, 25, 28, 30, 29, 26, 24, 22],
        borderColor: '#57c7e4ff',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        tension: 0.4,            // suaviza a linha
        borderWidth: 1,
        fill: true,              // preenche o fundo
        pointRadius: 2,
        pointBackgroundColor: '#57c7e4ff',
        pointHoverRadius: 4,
      
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true,
        labels: { color: '#ffffff7a' }
       },
      title: {
        display: true,
        text: 'Histórico de Temperatura (24h)',
        color: 'rgba(175, 191, 207, 1)',
        font: { size: 16 },
      },
      
    },
    scales: {
      x: {
        ticks: { color: '#333538ff' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        ticks: { color: '#9CA3AF' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
  },
});

  }
}
