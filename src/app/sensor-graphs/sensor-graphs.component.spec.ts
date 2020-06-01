import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorGraphsComponent } from './sensor-graphs.component';
import { SensorDataService } from '../sensor-data.service';
import { of } from 'rxjs';

const mockRawDataCSV = `time,s1,s2,s3
2020-06-01 19:37:22.026972,767,22.5,23.0,20.5
2020-06-01 19:38:24.746879,768,22.5,23.0,20.5
2020-06-01 19:39:27.466897,768,22.5,23.0,20.5`

const sensorDataService = jasmine.createSpyObj('SensorDataService', ['getRawDataCSV'])
var getRawDataCSVSpy = sensorDataService.getRawDataCSV.and.returnValue(of(mockRawDataCSV))

describe('SensorGraphsComponent', () => {
  let component: SensorGraphsComponent;
  let fixture: ComponentFixture<SensorGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorGraphsComponent ],
      providers: [
        {provide: SensorDataService, useValue: sensorDataService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
