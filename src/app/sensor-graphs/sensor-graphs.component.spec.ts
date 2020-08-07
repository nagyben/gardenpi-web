import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorGraphsComponent } from './sensor-graphs.component';
import { SensorDataService } from '../sensor-data.service';
import { of, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

let sensorDataServiceStub: Partial<SensorDataService>;

sensorDataServiceStub = {
  getRawDataCSV: function(): Observable<string> {
    return of("some data")
  },
  parseRawData: function(string): Map<string, Array<Array<number>>> {
    return new Map([
      ["s1", [[0, 767], [1, 768], [2, 768]]],
      ["s2", [[0, 22.5], [1, 22.5], [2, 22.5]]],
      ["s3", [[0, 23.0], [1, 23.0], [2, 23.0]]],
      ["s4", [[0, 20.5], [1, 20.5], [2, 20.5]]],
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should create one GraphComponent', () => {
    const graphComponent = fixture.nativeElement.querySelector('app-graph');
    expect(graphComponent).toBeTruthy();
  })
});
