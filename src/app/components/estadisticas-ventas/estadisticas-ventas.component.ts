import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.css']
})
export class EstadisticasVentasComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length < 2) {
      this.router.navigate(['acceso_denegado'])
    }
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 0,0,0,0,0,0,0,0,0,0,0,0 ],
        label: 'Ventas por mes',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#fc8a8a',
        pointBackgroundColor: '#fc8a8a',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#fc8a8a',
        fill: 'origin',
      },
    ],
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: '#fc8a8a',
        },
        ticks: {
          color: 'red'
        }
      }
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  
  
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    
  }

  volver(){
    this.router.navigate(['vista_admin'])
  }
}
