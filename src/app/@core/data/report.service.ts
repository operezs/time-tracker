import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

import { Report, IReport } from '../models/report';
import { ApiResponse } from '../models/response';

@Injectable()

export class ReportService {

  // Dinamic data
  private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}reports`;
  }

  getReports(startDate?: Date, endDate?: Date, userId?: string, projectId?: string) {
    let queryParams = '';
    if (startDate && endDate) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `startDate=${startDate}&endDate=${endDate}`;
    }
    if (projectId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `projectId=${projectId}`;
    }
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }

    return this.http.get<ApiResponse<Report[]>>(`${this.baseUrl}`);
  }

  getReport(id: string) {
    return this.http.get<ApiResponse<Report>>(`${this.baseUrl}/${id}`);
  }

  createReport(report: IReport) {
    return this.http.post(this.baseUrl, report);
  }

  updateReport(report: IReport) {
    return this.http.put(`${this.baseUrl}/${report.id}`, report);
  }

  deleteReport(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

