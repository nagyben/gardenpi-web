import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import theme from 'highcharts/themes/grid-light';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

theme(Highcharts);
Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements AfterViewInit {
  @Input() series?: Array<any>;
  @Input() title?: string;
  @Input() chartId?: string;

  constructor() {}

  ngAfterViewInit(){
    const options: Highcharts.Options = {
      chart: {
        type: 'scatter',
        height: 600
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        ordinal: false,
        min: new Date(new Date().setDate(new Date().getDate()-1)).getTime(),
      },
      series: this.series,
      plotOptions: {
        series: {
          animation: false,
          states: {
            hover: {
              enabled: false
            }
          },
          gapSize: 5
        },
        line: {
          marker: {
            enabled: false
          },
        },
      },
      boost: {
        useGPUTranslations: true
      },
      yAxis: [
        {gridLineWidth: 0, opposite: false, min: 0, max: 100, title: { text: 'Temperature \xb0C, Humidity (%)'}},
        {gridLineWidth: 0, opposite: true, min: 0, max: 1000, title: { text: 'Ambient light (lux)'}},
        {gridLineWidth: 0, opposite: true, min: 980, max: 1030, title: { text: 'Pressure'}},
      ],
      tooltip: {
        shared: true,
        split: false,
      },
      rangeSelector: {
        enabled: false
      },
    };
    Highcharts.stockChart(this.chartId, options);
  }

}
