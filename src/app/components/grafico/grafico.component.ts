import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  imports: [],
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
      type: 'bar', // pode ser 'line', 'pie', etc.
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
        datasets: [
          {
            label: 'Vendas',
            data: [30, 45, 60, 40],
            backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
            borderColor: '#111827',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: 'Relatório de Vendas',
            color: '#111827',
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            ticks: { color: '#4B5563' },
            grid: { color: '#E5E7EB' },
          },
          y: {
            ticks: { color: '#4B5563' },
            grid: { color: '#E5E7EB' },
          },
        },
      },
    });
  }
}
