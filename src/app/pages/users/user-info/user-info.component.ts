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
import { ReportActionsComponent } from './../../reports/report-actions.component';
import { ReportInfoComponent } from './../../reports/report-info/report-info.component';

@Component({
  selector: 'ngx-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {



/*   settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "Loading, please wait...",

    columns: {
      date: {
        title: 'Date',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let date = this.formatDate(value);
          return  date;
        }
      },
      users: {
        title: 'Developer Name',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value) {
            return `<div class = "row">
                      <div class = "container">
                        ${value.firstName}
                      </div>
                    </div>`;
          } else {
              return `<div class = "row">
                              <div class = "container">
                                  No User
                              </div>
                            </div>`;
          }
        },
        filter: true,
      },
      projects: {
        title: 'Project',
        type: 'html',
        valuePrepareFunction: (value) => {
          if (value) {
            return `<div class = "row">
                      <div class = "container">
                        ${value.projectName}
                      </div>
                    </div>`;
          } else {
              return `<div class = "row">
                        <div class = "container">
                          No Project Assigned
                        </div>
                      </div>`;
              }
          },
        filter: true,
      },
      time: {
        title: 'Time Work',
        type: 'number',
        filter: true,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: ReportActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(report => {
            this.editReport(report);
          });
          instance.delete.subscribe(report => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteReport(report.id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(report => {
            this.onView(report);
          });
        },
        width: '6%',
      },
    },
  }; */

  @Input() user: User;
  @Output() projects: Project[] = [];
  @Output() role: Role;
  @Output() userInfo: boolean;
  @Output() userMountWork: number[] = [50, 30, 45];
  @Output() spentTimeUser: number[] = [150, 100, 200, 185];


  source: LocalDataSource = new LocalDataSource();
  @Output() back = new EventEmitter();
  timeLoged: number;
  userId: string;

  constructor(private reportService: ReportService,
              private modalService: NgbModal,
              private projectService: ProjectService,
              private roleService: UserRoleService) {
    }

    /* openAddReportModal() {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'sm', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).titleForm = 'New Report';
    (<AddReportComponent>modal.componentInstance).userLog = this.userLog;
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  editReport(report) {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'sm', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).report = report;
    (<AddReportComponent>modal.componentInstance).titleForm = 'Edit Report';
    (<AddReportComponent>modal.componentInstance).userLog = this.userLog;
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  onView(report): void {
    const modal: NgbModalRef = this.modalService.open(ReportInfoComponent, { size: 'sm', container: 'nb-layout' });
    (<ReportInfoComponent>modal.componentInstance).report = report;
  } */

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
          //      this.getSpentTime(project.id, this.userId)
              }
            }
          }
        } 
    });
  }

  getSpentTime(projectId: string, userId: string) {
    this.reportService.getReports(null, null, projectId, userId).subscribe((reports: Response<Report[]>) => {
      let spentTimeUser = 0;
      for (let report of reports.data) {
          spentTimeUser += report.time;
        }
      this.spentTimeUser.push(spentTimeUser);
    }); 
    this.reportService.getReports(null, null, projectId, userId).subscribe((reports: Response<Report[]>) => {
      let userMountWork = 0;
      for (let report of reports.data) {
          userMountWork += report.time;
        }
      this.userMountWork.push(userMountWork);
    });
  }

  goBack() {
   this.back.emit();
  }

  openPaymentModal() {
    const modal: NgbModalRef = this.modalService.open(UserPaymentComponent, { size: 'sm', container: 'nb-layout' });
    (<UserPaymentComponent>modal.componentInstance).user = this.user;
    (<UserPaymentComponent>modal.componentInstance).userMountWork = this.userMountWork;
    (<UserPaymentComponent>modal.componentInstance).projects = this.projects;
    (<UserPaymentComponent>modal.componentInstance).role = this.role;


   /*  (<UserPaymentComponent>modal.componentInstance).save.subscribe(data => {
     this.getTableData();
   }); */
  }

/*getData() {
    this.projectService.getProjects().subscribe((project: Response<Project[]>) => {
      this.project = project.data;
      this.getTableData();
     });
  }

  getTableData(startDate?: Date, endDate?: Date, projectId?: string, userId?: string) {
    this.reportService.getReports(startDate, endDate, projectId, userId) // TODO: userId for this.userId
                .subscribe((reports: Response<Report[]>) => {
      this.source.load(reports.data);
      this.calcTotalTime(reports.data);  
    });
  }

  calcTotalTime(reports: Report[]) {
    this.timeLoged = 0;
    for (let report of reports) {
        this.timeLoged = this.timeLoged + report.time;
    }

  }

  formatDate(date:string): string {
    return `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`;

  } */
}
