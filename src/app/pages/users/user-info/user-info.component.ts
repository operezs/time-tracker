import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProjectService } from './../../../@core/data/project.service';
import { ReportService } from './../../../@core/data/report.service';
import { LocalDataSource } from 'ng2-smart-table';
import { User } from './../../../@core/models/user';
import { Project } from './../../../@core/models/project';
import { Role } from '../../../@core/models/role';
import { UserRoleService } from './../../../@core/data/user-role.service';
import { Response } from './../../../@core/models/response';
import { UserPaymentComponent } from './../user-payment/user-payment.component';
import { Report } from './../../../@core/models/report';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User;
  @Output() projects: Project[] = [];
  @Output() role: Role;
  @Output() userInfo: boolean;
  @Output() userMonthWork = new Map();
  // @Output() spentTimeUser: number[] = [];


  source: LocalDataSource = new LocalDataSource();
  @Output() back = new EventEmitter();
  timeLoged: number;

  constructor(private reportService: ReportService,
              private modalService: NgbModal,
              private projectService: ProjectService,
              private roleService: UserRoleService) {
    }

  ngOnInit() {
    this.getData();    
    this.userInfo = true;
  }
  
  getData() {
    this.roleService.getRole(this.user.roleId).subscribe((role: Response<Role>) => {
      this.role = role.data;     
    });
    this.projectService.getProjects().subscribe((projects: Response<Project[]>) => {
        for (let project of projects.data) {
          if (project.users) {
            for (let user of project.users) {
              if (user.id === this.user.id) {
                this.projects.push(project);               
              }
            }
          }
        }
      this.getSpentTime();   
    });
  }

  getSpentTime() {
    for (let project of this.projects) {
        this.reportService.getReports(null, null, project.id, this.user.id).subscribe((reports: Response<Report[]>) => {
          let userWork = 0;
          for (let report of reports.data) {
            userWork += report.time;
            }
          this.userMonthWork.set(project.id , userWork);
          });
      }

    /*     this.reportService.getReports(null, null, projectId, userId).subscribe((reports: Response<Report[]>) => {
      let spentTimeUser = 0;
      for (let report of reports.data) {
          spentTimeUser += report.time;
        }
      this.spentTimeUser.push(spentTimeUser);
    }); */ 
  }

  goBack() {
   this.back.emit();
  }

  openPaymentModal() {
    const modal: NgbModalRef = this.modalService.open(UserPaymentComponent, { size: 'sm', container: 'nb-layout' });
    (<UserPaymentComponent>modal.componentInstance).user = this.user;
    (<UserPaymentComponent>modal.componentInstance).userMonthWork = this.userMonthWork;
    (<UserPaymentComponent>modal.componentInstance).projects = this.projects;
    (<UserPaymentComponent>modal.componentInstance).role = this.role;
  }

}
