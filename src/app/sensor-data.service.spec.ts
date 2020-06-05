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
    const expected: Map<string, Array<number>> = new Map([
      ["s1", [767, 768, 768]],
      ["s2", [22.5, 22.5, 22.5]],
      ["s3", [23.0, 23.0, 23.0]],
      ["s4", [20.5, 20.5, 20.5]],
    ]);
    const actual = service.parseRawData(MOCK_CSV);
    expect(actual).toEqual(jasmine.objectContaining(expected));
  });
});
