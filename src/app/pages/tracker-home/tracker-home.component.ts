import { Component, Output, EventEmitter } from '@angular/core';

import { User } from './../../@core/models/user';
import { Response } from './../../@core/models/response';
import { UserService } from './../../@core/data/users.service';
import { Project } from './../../@core/models/project';
import { Role } from './../../@core/models/role';
import { ProjectService } from '../../@core/data/project.service';
import { UserRoleService } from '../../@core/data/user-role.service';

@Component({
  selector: 'ngx-tracker-home',
  templateUrl: './tracker-home.component.html',
})
export class TrackerHomeComponent {

  @Output() projects: Project[] = [];
  @Output() role: Role;
  @Output() user: User;
  @Output() userAdmin: boolean = false;
  
  userid: string;
  spinner = true;

constructor(  private projectService: ProjectService,
              private roleService: UserRoleService,
              private userService: UserService) {
    }

  ngOnInit() {
    this.getData();        
  }

  getData() {
    const roleName = this.userService.getDecodedAccessToken().roleName;
    this.userid = this.userService.getDecodedAccessToken().id;
    this.userService.getUser(this.userid).subscribe((user: Response<User>) =>{
      this.user = user.data;
      this.roleService.getRole(this.user.roleId).subscribe((role: Response<Role>) => {
        this.role = role.data;     
        });
      });

    if (roleName === 'Admin')
      {this.userAdmin = true;        
        this.projectService.getProjects().subscribe((projects: Response<Project[]>) => {
          this.projects = projects.data;
          this.spinner = false;

          });
      }
    else {
      this.projectService.getProjectsUser(this.userid).subscribe((projects: Response<Project[]>) => {
        this.projects = projects.data;
        this.spinner = false;

        }); 
    } 
  }

  cleanRangeDate() {
    //this.getValues(this.startDate, this.endDate, '');  
   }

}


