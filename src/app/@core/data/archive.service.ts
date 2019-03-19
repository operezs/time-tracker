import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from './global.service';
import { Archive } from '../models/archive';
import { ApiResponse } from '../models/response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  private baseUrl: string;

  constructor(private http: HttpClient,
    private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}archives`;
  }

  getArchives(userId?: string) {
    let queryParams = '';
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }
    
    return this.http.get<ApiResponse<Archive[]>>(`${this.baseUrl}${queryParams}`);
  }

  getCurrentMonth() {
    return this.http.get<ApiResponse<any>>(`${this.baseUrl}/current`);
  }

  createArchive() {
    return this.http.post<ApiResponse<Number>>(this.baseUrl, {});
  }
}
