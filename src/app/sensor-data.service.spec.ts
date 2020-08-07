import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SensorDataService } from './sensor-data.service';
import { stringify } from 'querystring';

const DATA_URL = "http://192.168.1.15/gardenpi.csv"
const MOCK_CSV = `time,s1,s2,s3,s4
2020-06-01 19:37:22.026972,767,22.5,23.0,20.5
2020-06-01 19:38:24.746879,768,22.5,23.0,20.5
2020-06-01 19:39:27.466897,768,22.5,23.0,20.5`

describe('SensorDataService', () => {
  let service: SensorDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SensorDataService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a http get call', () => {
    service.getRawDataCSV().subscribe(data => {
      expect(data).toEqual(MOCK_CSV);
    });
    const req = httpMock.expectOne(DATA_URL);
    expect(req.request.method).toEqual('GET');
    // req.flush(MOCK_CSV);
  });

  it('should parse the data correctly', () => {
    const expected: Map<string, Array<Array<number>>> = new Map([
      ["s1", [[1591036642026, 767],  [1591036704746, 768],  [1591036767466, 768]]],
      ["s2", [[1591036642026, 22.5], [1591036704746, 22.5], [1591036767466, 22.5]]],
      ["s3", [[1591036642026, 23.0], [1591036704746, 23.0], [1591036767466, 23.0]]],
      ["s4", [[1591036642026, 20.5], [1591036704746, 20.5], [1591036767466, 20.5]]],
    ]);
    const actual = service.parseRawData(MOCK_CSV);

    for (let [key, value] of actual) {
      expect(actual.get(key)).toEqual(expected.get(key));
    }
  });

  it('should get the current sensor values', done => {
    const expected: Map<string, number> = new Map([
      ["s1", 768],
      ["s2", 22.5],
      ["s3", 23]
    ]);

    service.getCurrentSensorValues().subscribe(actual => {
      for (let key of expected.keys()) {
        expect(actual.has(key)).toBeTrue();
        expect(actual.get(key)).toEqual(expected.get(key));
      }
      done();
    })

    const req = httpMock.expectOne(DATA_URL);
    req.flush(MOCK_CSV);
  })
});
