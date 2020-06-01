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

  parseRawDataToDict(data: string) {
  }
}
