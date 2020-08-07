import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../sensor-data.service';
import { Sensor, SensorQuantity } from '../sensor';

@Component({
  selector: 'app-sensor-values',
  templateUrl: './sensor-values.component.html',
  styleUrls: ['./sensor-values.component.sass']
})
export class SensorValuesComponent implements OnInit {
  sensors: Sensor[];

  constructor(private sensorDataService: SensorDataService) { }

  getData(): void {
    this.sensorDataService.getCurrentSensorValues()
    .subscribe(data => {
      this.sensors = [];
      for (let [key, value] of data) {
        this.sensors.push({name: key, value: value, unit: SENSOR_MAP[key]})
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

}

const SENSOR_MAP = {
  "t_external": SensorQuantity.TEMPERATURE,
  "t_internal_1": SensorQuantity.TEMPERATURE,
  "t_internal_2": SensorQuantity.TEMPERATURE,
  "t_bme280": SensorQuantity.TEMPERATURE,
  "pressure": SensorQuantity.PRESSURE,
  "humidity": SensorQuantity.HUMIDITY,
  "lux": SensorQuantity.LIGHT
}