import { Component, OnInit, Input } from '@angular/core';
import { Sensor, SensorQuantity, getUnitString } from '../sensor';

@Component({
  selector: 'app-sensor-value',
  templateUrl: './sensor-value.component.html',
  styleUrls: ['./sensor-value.component.sass']
})
export class SensorValueComponent implements OnInit {
  @Input() sensor: Sensor;

  unitString: string;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.sensor) {
      this.unitString = getUnitString(this.sensor.unit);
    }
  }

}
