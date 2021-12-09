import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  getData() : Observable<Object> {
    return this.httpClient
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
  }
}
