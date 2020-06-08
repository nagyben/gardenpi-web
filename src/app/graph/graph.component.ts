import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

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
      title: {
        text: this.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        ordinal: false
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
        {opposite: false},
        {opposite: true},
      ]
    };
    Highcharts.stockChart(this.chartId, options);
  }

}
