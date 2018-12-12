
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Response } from './../models/response';

import { Role } from '../models/role';

@Injectable()

export class UserRoleService {

// Dinamic data

// Dinamic data
  private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}roles`;
  }

  getRoles() {
    return this.http.get<Response<Role[]>>(this.baseUrl);
  }

  getRole(id: string) {
    return this.http.get<Response<Role>>(`${this.baseUrl}/${id}`);
  }

  createRole(role: Role) {
    return this.http.post(this.baseUrl, role);
  }

  updateRole(role: Role) {
    return this.http.put(`${this.baseUrl}/${role.id}`, role);
  }

  deleteRole(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }



  /* data: Role[] = [
    new Role('FullStack', 'Full Time', 400,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            true, 8),
    new Role('Junior', 'Midle Time' , 200,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            false),
    new Role('Sennior', 'Full Time' , 500,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            true, 3),
    new Role('QA Tester', 'Full Time' , 350,
            'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            true, 7.50),
  ];


  getRoles(): Observable<Role[]> {
    return observableOf(this.data);
  }

  createRole(role: Role): Observable<Role[]> {
    this.data.push(role);
    return observableOf(this.data);
  }

  updateRole(role: Role): Observable<any> {
    return observableOf(this.data);
  }

  deleteRole(name: string): Observable<any> {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].roleName === name) {
        index = i;
      }
    }
    if (index >= 0)
      this.data.splice(index, 1);
    return observableOf(this.data);
  }

 */



}

