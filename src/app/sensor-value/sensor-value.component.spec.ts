import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorValueComponent } from './sensor-value.component';
import { SensorQuantity } from '../sensor';

describe('SensorValueComponent', () => {
  let component: SensorValueComponent;
  let fixture: ComponentFixture<SensorValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorValueComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    component.sensor = {name: "herp", value: 12.4, unit: SensorQuantity.TEMPERATURE, limit: 0};
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show its value', () => {
    component.sensor = {name: "herp", value: 12.4, unit: SensorQuantity.TEMPERATURE, limit: 0};
    fixture.detectChanges();
    const header = fixture.nativeElement.querySelector('h5');
    expect(header.textContent).toContain("12.4")
  })
});
