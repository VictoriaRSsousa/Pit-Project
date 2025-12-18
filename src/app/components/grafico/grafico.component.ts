import { AfterViewInit, Component, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements AfterViewInit, OnChanges {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() temperatura: number | null = null;
  @Input() umidade: number | null = null;

  private chart!: Chart;
  private labels: string[] = [];

  ngAfterViewInit() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#57c7e4ff',
            backgroundColor: 'rgba(59, 130, 246, 0.3)',
            tension: 0.4,
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Umidade (%)',
            data: [],
            borderColor: '#00ff95',
            backgroundColor: 'rgba(0,255,149,0.15)',
            tension: 0.4,
            borderWidth: 2,
            fill: true
          }
        ]
      },
 options: {
  responsive: true,
  maintainAspectRatio: false, // 🔴 ESSENCIAL pro mobile
  animation: { duration: 0 },
  plugins: {
    legend: {
      labels: {
        color: '#E6F1FF',
        font: {
          size: window.innerWidth < 768 ? 10 : 12
        }
      }
    },
    title: {
      display: true,
      text: 'Monitoramento em Tempo Real',
      color: 'rgba(175, 191, 207, 1)',
      font: {
        size: window.innerWidth < 768 ? 12 : 16
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#8797B2',
        maxTicksLimit: window.innerWidth < 768 ? 4 : 8 // 🔴 menos labels
      }
    },
    y: {
      ticks: {
        color: '#8797B2',
        font: {
          size: window.innerWidth < 768 ? 10 : 12
        }
      }
    }
  }
}

    });
  }

ngOnChanges() {
  if (!this.chart) return;
  if (this.temperatura == null || this.umidade == null) return;

  const t = new Date();
  const time = `${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}`;

  this.labels.push(time);

  this.chart.data.labels = this.labels;
  this.chart.data.datasets[0].data.push(this.temperatura);
  this.chart.data.datasets[1].data.push(this.umidade);

  const tempDataset = this.chart.data.datasets[0];
  if (this.temperatura > 50) {
    tempDataset.borderColor = '#ff3b3b';
    tempDataset.backgroundColor = 'rgba(255, 0, 0, .3)';
  } else {
    tempDataset.borderColor = '#57c7e4ff';
    tempDataset.backgroundColor = 'rgba(59, 130, 246, 0.3)';
  }

  if (this.labels.length > 20) {
    this.labels.shift();
    this.chart.data.datasets.forEach(d => d.data.shift());
  }

  this.chart.update('none'); 
}
}