import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from './global.service';
import { Invoice, IInvoice } from '../models/invoice';
import { ApiResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // Dinamic data
  private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}invoices`;
  }

  createInvoice(invoice: IInvoice) {
    return this.http.post(this.baseUrl, invoice);
  }

  getInvoice(userId: string, month: number, year: number) {
    let queryParams = `?userId=${userId}&month=${month}&year=${year}`;
    return this.http.get<ApiResponse<Invoice>>(`${this.baseUrl}/userDate${queryParams}`);
  }

  getInvoices(month?: number, year?: number) {
    let queryParams = '';
    if (month) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `month=${month}`;
    }

    if (year) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `year=${year}`;
    }

    return this.http.get<ApiResponse<Invoice[]>>(`${this.baseUrl}/date${queryParams}`);
  }
}
