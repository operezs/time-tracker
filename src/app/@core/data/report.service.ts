import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

import { Report} from '../models/report';
import { Response } from '../models/response';

@Injectable()

export class ReportService {

  // Dinamic data
 private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}reports`;
  }

  getReports(startDate?: Date, endDate?: Date, projectId?: string, userId?: string) {
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

    if (queryParams) {
        return this.http.get<Response<Report[]>>(`${this.baseUrl}${queryParams}`);
    }
    else
        return this.http.get<Response<Report[]>>(`${this.baseUrl}`);
            
  }

  getReport(id: string) {
    return this.http.get<Response<Report>>(`${this.baseUrl}/${id}`);
  }

  createReport(report: Report) {
    return this.http.post(this.baseUrl, report);
  }

  updateReport(report: Report) {
    return this.http.put(`${this.baseUrl}/${report.id}`, report);
  }

  deleteReport(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}

