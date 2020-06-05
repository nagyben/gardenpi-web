import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { SensorDataService } from '../sensor-data.service';
import { Observable, of } from 'rxjs';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    component.chartId = "chart-id";
    component.series = [{
      name: "herp",
      data: [[0,0], [1,1], [2,2]],
      type: 'spline',
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show a highcharts chart', () => {
    const highchart = fixture.nativeElement.querySelectorAll('.highcharts-container');
    expect(highchart.length).toEqual(1);
  });
});
