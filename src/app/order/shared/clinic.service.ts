import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import Clinic from './clinic.model';
import ListItem from './list-tem.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicService {
  private readonly baseUrl = `${environment.apiUrl}/clinics`;

  constructor(private httpClient: HttpClient) {}

  getClinicsList() {
    return this.httpClient.get<ListItem[]>(`${this.baseUrl}/list`);
  }

  getMyClinics() {
    return this.httpClient.get<Clinic[]>(`${this.baseUrl}/myclinics`);
  }
}
