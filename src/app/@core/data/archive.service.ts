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
    this.baseUrl = `${this.global.apiUrl()}reports/archives`;
  }

  getArchives(userId?: string) {
    /*let queryParams = '';
    if (userId) {
      queryParams += queryParams.length > 0 ? '&' : '?';
      queryParams += `userId=${userId}`;
    }    

    if (queryParams) {
        return this.http.get<ApiResponse<Archive[]>>(`${this.baseUrl}${queryParams}`);
    }
    else
        return this.http.get<ApiResponse<Archive[]>>(`${this.baseUrl}`);*/
    const user: User = new User('cjfigueiras', 'Figueiras', 'cjfigueiras1990@gmail.com');
    user.id = 'id-123';
    const archives: Archive[] = [
      {
        user: user,
        year: 2018,
        months: [6, 7, 8, 9, 10, 11, 12]
      },
      {
        user: user,
        year: 2019,
        months: [1, 2]
      }
    ];
    return archives;      
  }
}
