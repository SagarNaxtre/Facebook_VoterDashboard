import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environments';
import { endpoints } from '../core/endpoint';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private http: HttpClient) { 

  }
}
