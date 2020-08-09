import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

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
        {opposite: false, min: 0, title: { text: 'Temperature \xb0C, Humidity (%)'}},
        {opposite: true, title: { text: 'Ambient light (lux)'}},
        {opposite: true, title: { text: 'Pressure'}},
      ],
      tooltip: {
        shared: true,
        split: false,
      },
      rangeSelector: {
        buttons: [
          {
              type: 'month',
              count: 1,
              text: '1m'
          },
          {
              type: 'month',
              count: 3,
              text: '3m'
          },
          {
              type: 'month',
              count: 6,
              text: '6m'
          },
          {
              type: 'ytd',
              text: 'YTD'
          },
          {
              type: 'year',
              count: 1,
              text: '1y'
          },
          {
              type: 'all',
              text: 'All'
          }
        ]
      }
    };
    Highcharts.stockChart(this.chartId, options);
  }

}
