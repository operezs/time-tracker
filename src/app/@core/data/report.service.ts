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

  getTotalHours(userId?: string) {
    let queryParams = '';
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }

    return this.http.get<ApiResponse<number>>(`${this.baseUrl}/totalHours${queryParams}`);
  }

  getReports(userId?: string, projectId?: string) {
    let queryParams = '';
    if (projectId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `projectId=${projectId}`;
    }
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }

    return this.http.get<ApiResponse<Report[]>>(`${this.baseUrl}${queryParams}`);
  }

  getReportsByDate(userId?: string, startDate?: Date, endDate?: Date) {
    let queryParams = '';
    if (startDate && endDate) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `startDate=${startDate}&endDate=${endDate}`;
    }

    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }

    return this.http.get<ApiResponse<Report[]>>(`${this.baseUrl}${queryParams}`);
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

