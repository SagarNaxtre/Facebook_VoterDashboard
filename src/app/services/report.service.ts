import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environments';
import { endpoints } from '../core/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private http: HttpClient) {}
  responseData(){
    return this.http.get(environment.api_base_url+ endpoints.data)
  }
}
