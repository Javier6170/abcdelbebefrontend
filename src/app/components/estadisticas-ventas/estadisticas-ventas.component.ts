import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Venta } from 'src/app/model/venta';
import { VentaServiceService } from 'src/app/services/venta-service.service';


import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas-ventas',
  templateUrl: './estadisticas-ventas.component.html',
  styleUrls: ['./estadisticas-ventas.component.css']
})
export class EstadisticasVentasComponent implements OnInit {

  listaVentas: Venta[];
  tamaño: number;
  ventaUnica: Venta;
  ventaMesUno: number = 0;
  ventaMesDos: number = 0;
  ventaMesTres: number = 0;
  ventaMesCuatro: number = 0;
  ventaMesCinco: number = 0;
  ventaMesSeis: number = 0;
  ventaMesSiete: number = 0;
  ventaMesOcho: number = 0;
  ventaMesNueve: number = 0;
  ventaMesDiez: number = 0;
  ventaMesOnce: number = 0;
  ventaMesDoce: number = 0;

  fecha: Date = new Date();
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
    private ventaService:VentaServiceService) { }

  ngOnInit(): void {
    if (this.tokenService.getAuthorities().length < 2) {
      this.router.navigate(['acceso_denegado'])
    }

    this.ventaService.listaVentas().subscribe(res => {
      this.listaVentas = res;
      for (let i = 0; i < this.listaVentas.length; i++) {
        if (this.listaVentas[i].mes == 1) {
          this.ventaMesUno = this.ventaMesUno + 1;
        }
        if (this.listaVentas[i].mes == 2) {
          this.ventaMesDos = this.ventaMesDos + 1;
        }
        if (this.listaVentas[i].mes == 3) {
          this.ventaMesTres = this.ventaMesTres + 1;
        }
        if (this.listaVentas[i].mes == 4) {
          this.ventaMesCuatro = this.ventaMesCuatro + 1;
        }
        if (this.listaVentas[i].mes == 5) {
          this.ventaMesCinco = this.ventaMesCinco + 1;
        }
        if (this.listaVentas[i].mes == 6) {
          this.ventaMesSeis = this.ventaMesSeis + 1;
        }
        if (this.listaVentas[i].mes == 7) {
          this.ventaMesSiete = this.ventaMesSiete + 1;
        }
        if (this.listaVentas[i].mes == 8) {
          this.ventaMesOcho = this.ventaMesOcho + 1;
        }
        if (this.listaVentas[i].mes == 9) {
          this.ventaMesNueve = this.ventaMesNueve + 1;
        }
        if (this.listaVentas[i].mes == 10) {
          this.ventaMesDiez = this.ventaMesDiez + 1;
        }
        if (this.listaVentas[i].mes == 11) {
          this.ventaMesOnce = this.ventaMesOnce + 1;
        }
        if (this.listaVentas[i].mes == 12) {
          this.ventaMesDoce = this.ventaMesDoce + 1;
        }
        this.updateChart(this.listaVentas[i].mes , this.ventaMesUno, this.ventaMesDos, this.ventaMesTres, this.ventaMesCuatro, this.ventaMesCinco, this.ventaMesSeis, this.ventaMesSiete, this.ventaMesOcho, this.ventaMesNueve, this.ventaMesDiez, this.ventaMesOnce, this.ventaMesDoce);
      }
    });

   
    
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

  public updateChart(mes: number, uno:number, dos: number, tres:number, cuatro:number, cinco:number, 
    seis:number,siete:number,ocho:number,nueve:number,diez:number,once:number,doce:number): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        if (j == 1) {
          this.lineChartData.datasets[i].data[j] = uno;
        }
        if (j == 2) {
          this.lineChartData.datasets[i].data[j] = dos;
        }
        if (j == 3) {
          this.lineChartData.datasets[i].data[j] = tres;
        }
        if (j == 4) {
          this.lineChartData.datasets[i].data[j] = cuatro;
        }
        if (j == 5) {
          this.lineChartData.datasets[i].data[j] = cinco;
        }
        if (j == 6) {
          this.lineChartData.datasets[i].data[j] = seis;
        }
        if (j == 7) {
          this.lineChartData.datasets[i].data[j] = siete;
        }
        if (j == 8) {
          this.lineChartData.datasets[i].data[j] = ocho;
        }
        if (j == 9) {
          this.lineChartData.datasets[i].data[j] = nueve;
        }
        if (j == 10) {
          this.lineChartData.datasets[i].data[j] = diez;
        }
        if (j == 11) {
          this.lineChartData.datasets[i].data[j] = once;
        }
        if (j == 12) {
          this.lineChartData.datasets[i].data[j] = doce;
        }
      }
    }
    this.chart?.update();
  }
}
