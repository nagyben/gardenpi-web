import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  parseRawData(rawData: string): Map<String, Array<number>> {
    var retval = new Map<String, Array<number>>();
    const lines = rawData.split('\n');
    const headers = lines[0].split(',');
    console.log(headers);
    for (let i = 0; i < headers.length; i++) {
      retval[headers[i]] = new Array<number>();
    }
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const vals = line.split(',');
      const date = Date.parse(vals[0])
      for (let j = 1; j < vals.length; j++) {
        const val = vals[j];
        retval[headers[j]].push(
          [date, parseFloat(val)]
        );
      }
    }

    return retval
  }
}
