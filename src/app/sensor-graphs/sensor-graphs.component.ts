import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import { GraphComponent } from '../graph/graph.component';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';


const SENSOR_KEYS = [
  "lux", "t_4cba936", "t_4cdf645", "4ce8778"
]

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

  updateData(data: Map<String, Array<number>>): void {
    var series = [];
    for (const key of SENSOR_KEYS) {
      console.log(key)
      if (data.hasOwnProperty(key)) {
        series.push(
          {
            name: key,
            data: data[key],
            type: 'spline',
            lineWidth: 1,
            yAxis: key == "lux" ? 1 : 0,
            dataGrouping: {
              enabled: true,
              groupPixelWidth: 20
            },
            tooltip: {
              valueDecimals: 1
            }
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
