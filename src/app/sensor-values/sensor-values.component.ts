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
        this.sensors.push({
          name: key,
          value: value,
          unit: key in SENSOR_MAP ? SENSOR_MAP[key]["unit"] : "",
          limit: key in SENSOR_MAP ? SENSOR_MAP[key]["limit"] : ""
        })
      }
    })
  }

  ngOnInit(): void {
    this.getData();
  }

}

const SENSOR_MAP = {
  "t_external": {
    "unit": SensorQuantity.TEMPERATURE,
    "limit": 0
  },
  "t_internal1": {
    "unit": SensorQuantity.TEMPERATURE,
    "limit": 35
  },
  "t_internal2": {
    "unit": SensorQuantity.TEMPERATURE,
    "limit": 35
  },
  "t_bme280": {
    "unit": SensorQuantity.TEMPERATURE,
    "limit": 35
  },
  "pressure": {
    "unit": SensorQuantity.PRESSURE,
    "limit": 0
  },
  "humidity": {
    "unit": SensorQuantity.HUMIDITY,
    "limit": 80
  },
  "lux": {
    "unit": SensorQuantity.LIGHT,
    "limit": 0
  },
}