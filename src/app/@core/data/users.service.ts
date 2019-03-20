import { Role } from './../models/role';
import { UserRoleService } from './user-role.service';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { User } from '../models/user';
import { ApiResponse } from './../models/response';

@Injectable()
export class UserService {
  // Dinamic data
  token: string;

  private baseUrl: string;

  constructor(private http: HttpClient,
    private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}users`;
  }

  getUsers() {
    return this.http.get<ApiResponse<User[]>>(this.baseUrl);
  }

  getDevelopers() {
    return this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/developer`);
  }

  getUser(id: string) {
    return this.http.get<ApiResponse<User>>(`${this.baseUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getDecodedAccessToken(): any {
    this.token = JSON.parse(localStorage.getItem('auth_app_token')).value;
    try {
      return jwt_decode(this.token);
    } catch (Error) {
      return null;
    }
  }

  // The Theme Default-------------------------------------------------------

  /*   private users = {
      nick: { picture: 'assets/images/nick.png', name: 'Nick Jones',
              last_name: 'Pérez', email: 'operezs1990@gmail.com'},
      eva: { picture: 'assets/images/nick.png', name: 'Eva Moor',
              last_name: 'Pérez', email: 'operezs1990@gmail.com' },
      jack: { picture: 'assets/images/nick.png', name: 'Jack Williams',
              last_name: 'Pérez', email: 'operezs1990@gmail.com' },
      lee: { picture: 'assets/images/nick.png', name: 'Lee Wong',
              last_name: 'Pérez', email: 'operezs1990@gmail.com' },
      alan: { picture: 'assets/images/nick.png', name: 'Alan Thompson',
              last_name: 'Pérez', email: 'operezs1990@gmail.com'},
      kate: { picture: 'assets/images/nick.png', name: 'Kate Martinez',
              last_name: 'Pérez', email: 'operezs1990@gmail.com' },
      admin: { picture: 'assets/images/nick.png', name: 'Admin',
              last_name: 'Pérez', email: 'operezs1990@gmail.com' },
    };
  
    private userArray: any[];
  
  
    getUsers(): Observable<any> {
      return observableOf(this.users);
    }
  
    getUserArray(): Observable<any[]> {
      return observableOf(this.userArray);
    }
  
    getUser(): Observable<any> {
      counter = (counter + 1) % this.userArray.length;
      return observableOf(this.userArray[counter]);
    }
  
    getData() {
      return Object.values(this.users);
    } */
}

