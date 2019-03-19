import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { ApiResponse } from '../models/response';
import { Mission } from '../models/mission';

@Injectable()
export class MissionService {

  private baseUrl: string;

  constructor(private http: HttpClient,
    private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}missions`;
  }

  getMissions() {
    return this.http.get<ApiResponse<Mission[]>>(this.baseUrl);
  }

}
