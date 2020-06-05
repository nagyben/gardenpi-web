import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorGraphsComponent } from './sensor-graphs.component';
import { SensorDataService } from '../sensor-data.service';
import { of, Observable } from 'rxjs';

let sensorDataServiceStub: Partial<SensorDataService>;

sensorDataServiceStub = {
  getRawDataCSV: function(): Observable<string> {
    return of("some data")
  },
  parseRawData: function(string): Map<string, Array<number>> {
    return new Map([
      ["s1", [767, 768, 768]],
      ["s2", [22.5, 22.5, 22.5]],
      ["s3", [23.0, 23.0, 23.0]],
      ["s4", [20.5, 20.5, 20.5]],
    ]);
  }
}

describe('SensorGraphsComponent', () => {
  let component: SensorGraphsComponent;
  let fixture: ComponentFixture<SensorGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorGraphsComponent ],
      providers: [
        {provide: SensorDataService, useValue: sensorDataServiceStub}
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
