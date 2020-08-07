import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {

  constructor(private http: HttpClient) { }

  getRawDataCSV(): Observable<string> {
    return this.http.get('http://192.168.1.15/gardenpi.csv', {
      responseType: 'text'
    });
  }

  parseRawData(rawData: string): Map<string, Array<Array<number>>> {
    var retval = new Map<string, Array<Array<number>>>();
    const lines = rawData.split('\n');
    const headers = lines[0].split(',');
    console.log(headers);
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] != "time") {
        retval.set(headers[i], []);
      }
    }
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const vals = line.split(',');
      const date = Date.parse(vals[0])
      for (let j = 1; j < vals.length; j++) {
        const val = vals[j];
        retval.get(headers[j]).push([date, parseFloat(val)])
      }
    }

    return retval
  }

  getLatestValuesFromParsedData(data: Map<string, Array<Array<number>>>): Map<string, number> {
    var retval = new Map<string, number>();
    for (const key of data.keys()) {
      const arr = data.get(key);
      retval.set(key, arr[arr.length - 1][1]);
    }
    return retval;
  }

  getTimedSensorValues(): Observable<Map<string, Array<Array<number>>>> {
    return new Observable((observer) => {
      this.getRawDataCSV().subscribe((data) => {
        observer.next(this.parseRawData(data));
      });
      return {unsubscribe() {}};
    });
  }

  getCurrentSensorValues(): Observable<Map<string, number>> {
      return this.getRawDataCSV()
      .pipe(
        map(x => this.parseRawData(x)),
        map(x => this.getLatestValuesFromParsedData(x))
      );
  }
}
