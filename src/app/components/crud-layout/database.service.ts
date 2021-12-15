import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Oil} from "../../models/oil.model";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private httpClient: HttpClient) { }

  getOilsList() : Observable<Object> {
    return this.httpClient
      .get('http://localhost:3000/oils')
  }

  getOilByID(id: string): Observable<Oil>{
    return this.httpClient
      .get<Oil>(`http://localhost:3000/oils/${id}`);
  }

  getOilDetailById (id: string): Observable<any> {
    return this.httpClient
      .get<any>(`http://localhost:3000/oils/${id}/?_embed=domains`)
  }

  addOil(oil: Oil) : Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(oil);
    return this.httpClient.post('http://localhost:3000/oils/?_embed=domains', body, {'headers': headers});
  }
}
