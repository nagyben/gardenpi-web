import { TestBed } from '@angular/core/testing';

import { SensorDataService } from './sensor-data.service';
let httpClientSpy: {get: jasmine.Spy };
describe('SensorDataService', () => {
  let service: SensorDataService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http get call', () => {
    const expectedData = "expected data"
    service.getRawDataCSV().subscribe(
      data => expect(data).toEqual(expectedData),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1)
  })
});
