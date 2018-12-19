import { Injectable } from '@angular/core';
import { of as observableOf, Observable} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { HttpClient } from '@angular/common/http';
// import { GlobalService } from './global.service';

// import { Response } from '../models/response';
import { Expense } from '../models/expense';

@Injectable()

export class ExpensesService {


  data: Expense[] = [
    new Expense('Nick Jones', 150, 180, 2,
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                33),
    new Expense('Orlando', 100, 120, 2,
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                50),
    new Expense('Carlos Julio', 50, 80, 2,
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
                10),
  ];


  getExpenses(): Observable<Expense[]> {
    return observableOf(this.data);
  }

  createExpense(expense: Expense): Observable<Expense[]> {
    this.data.push(expense);
    return observableOf(this.data);
  }

  updateExpense(expense: Expense): Observable<any> {
    return observableOf(this.data);
  }

  deleteExpense(userName: string): Observable<any> {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].userName === userName) {
        index = i;
      }
    }
    if (index >= 0)
      this.data.splice(index, 1);
    return observableOf(this.data);
  } 

  // Dinamic data
/*  private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}expenses`;
  }

  getExpenses(startDate?: Date, endDate?: Date, userId?: string) {
    let queryParams = '';
    if (startDate && endDate) {
       queryParams += queryParams.length > 0 ? '&' : '?';
       queryParams += `startDate=${startDate}&endDate=${endDate}`;
    }
    
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }    

    if (queryParams) {
        return this.http.get<Response<Expense[]>>(`${this.baseUrl}${queryParams}`);
    }
    else
        return this.http.get<Response<Expense[]>>(`${this.baseUrl}`);
            
  }

  getExpense(id: string) {
    return this.http.get<Response<Expense>>(`${this.baseUrl}/${id}`);
  }

  createExpense(expense: Expense) {
    return this.http.post(this.baseUrl, expense);
  }

  updateExpense(expense: Expense) {
    return this.http.put(`${this.baseUrl}/${report.id}`, expense);
  }

  deleteExpense(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  } */

}

