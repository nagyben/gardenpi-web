import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import { GraphComponent } from '../graph/graph.component';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';

@Component({
  selector: 'app-sensor-graphs',
  templateUrl: './sensor-graphs.component.html',
  styleUrls: ['./sensor-graphs.component.sass']
})
export class SensorGraphsComponent implements OnInit {

  constructor(private sensorDataService: SensorDataService) { }

  private rawData: string;

  public graphs = new Array<any>();

  getData(): void {
    this.sensorDataService.getRawDataCSV()
    .subscribe((rawData) => {
      const data = this.parseRawData(rawData);
      this.updateData(data);
    });
  }

  private parseRawData(rawData: string): Map<String, Array<number>> {
    var retval = new Map<String, Array<number>>();
    const lines = rawData.split('\n');
    const headers = lines[0].split(',');
    for (const header of headers) {
      retval[header] = new Array<number>();
    }
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const vals = line.split(',');
      const date = Date.parse(vals[0])
      for (let j = 1; j < vals.length; j++) {
        const val = vals[j];
        retval[headers[j]].push(
          [date, parseFloat(val)]
        );
      }
    }

    return retval
  }

  updateData(data: Map<String, Array<number>>): void {
    var series = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        series.push(
          {
            name: key,
            data: data[key],
            type: 'spline',
            lineWidth: 1,
            yAxis: key == "lux" ? 1 : 0
          }
        )
      }
    }

    this.graphs = [{
      series: series,
      title: "GardenPi data",
      chartId: "gardenpi-chart",
    }]

    console.log(this.graphs);
  }

  ngOnInit(): void {
    this.getData();
  }

}
