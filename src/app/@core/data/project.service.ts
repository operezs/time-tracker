import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

import { Project} from '../models/project';
import { Response } from '../models/response';

@Injectable()

export class ProjectService {

  // Dinamic data

  private baseUrl: string;
    constructor(private http: HttpClient, private global: GlobalService) {
      this.baseUrl = `${this.global.apiUrl()}projects`;
    }
    getProjects() {
      return this.http.get<Response<Project[]>>(this.baseUrl);
    }
    getProject(id: string) {
      return this.http.get<Response<Project>>(`${this.baseUrl}/${id}`);
    }
    createProject(project: Project) {
      return this.http.post(this.baseUrl, project);
    }
    updateProject(project: Project) {
      return this.http.put(`${this.baseUrl}/${project.id}`, project);
    }
    deleteProject(id: string) {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }



/*   data: Project[] = [
    new Project('Cognoware', 150, 'First project', 10),
    new Project('Chaskify', 150, 'First project', 60),
    new Project('Booking', 150, 'First project', 100),
    new Project('Facebook', 150, 'First project', 140),
  ];


  getData(): Observable<any> {
    return observableOf(this.data);
  }

  getProjects(): Observable<Project[]> {
    return observableOf(this.data);
  }

  createProject(project: Project): Observable<Project[]> {
    this.data.push(project);
    return observableOf(this.data);
  }

  updateProject(project: Project): Observable<any> {
    return observableOf(this.data);
  }

  deleteProject(name: string): Observable<any> {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].projectName === name) {
        index = i;
      }
    }
    if (index >= 0)
      this.data.splice(index, 1);
    return observableOf(this.data);
  }

 */
}

