import { Component, OnInit, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';

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
        height: 300
      },
      title: {
        text: this.title
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%e %b %y', this.value);
          }
        }
      },
      series: this.series,
      plotOptions: {
        series: {
          animation: false,
          states: {
            hover: {
              enabled: false
            }
          }
        },
        line: {
          marker: {
            enabled: false
          }
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
    Highcharts.chart(this.chartId, options);
  }

}
