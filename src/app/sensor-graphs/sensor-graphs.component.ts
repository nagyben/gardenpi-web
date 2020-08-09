import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import { GraphComponent } from '../graph/graph.component';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';


const YAXIS_REF = {
  "pressure": 2,
  "lux": 1
}

@Component({
  selector: 'app-sensor-graphs',
  templateUrl: './sensor-graphs.component.html',
  styleUrls: ['./sensor-graphs.component.sass']
})
export class SensorGraphsComponent implements OnInit {

  constructor(private sensorDataService: SensorDataService) { }

  public graphs = new Array<any>();

  getData(): void {
    this.sensorDataService.getRawDataCSV()
    .subscribe((rawData) => {
      const data = this.sensorDataService.parseRawData(rawData);
      this.updateData(data);
    });
  }

  updateData(data: Map<string, Array<Array<number>>>): void {
    var series = [];
    for (var key of data.keys()) {
      series.push(
        {
          name: key,
          data: data.get(key),
          type: 'spline',
          lineWidth: 1,
          yAxis: key in YAXIS_REF ? YAXIS_REF[key] : 0,
          dataGrouping: {
            enabled: true,
            groupPixelWidth: 5
          },
          tooltip: {
            valueDecimals: 1
          }
        }
      )
    }

    this.graphs = [{
      series: series,
      title: "GardenPi data",
      chartId: "gardenpi-chart",
    }]

  }

  ngOnInit(): void {
    this.getData();
  }

}
