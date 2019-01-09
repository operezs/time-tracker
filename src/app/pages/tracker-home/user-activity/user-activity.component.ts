import { Component, Input, Output } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { Response } from './../../../@core/models/response';
import { ReportService } from './../../../@core/data/report.service';
import { Project } from './../../../@core/models/project';
import { User } from './../../../@core/models/user';
import { UserService } from './../../../@core/data/users.service';
import { Report } from './../../../@core/models/report';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-user-activity',
  styleUrls: ['./user-activity.component.scss'],
  templateUrl: './user-activity.component.html',
})

export class TrackerHomeUserActivityComponent {

  private alive = true;

  users: User[];
 
  userProjects = new Map();
  userReportsTime = new Map();
  
  projectReportId = new Set();
  
  reports: Report[];
  
  rangeDate: any;
  startDate: Date = null;
  endDate: Date = null;

  size = 'medium';
      
  type = 'all work';
  types = ['all work', 'this week', 'this month', 'this year', 'last week', 'last month', 'last year'];
  currentTheme: string;

  spinner = true;

  constructor(private themeService: NbThemeService, 
              private modalService: NgbModal,
              private reportService: ReportService,
              private userService: UserService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getUsers().subscribe((users: Response<User[]>) => {
      this.users = users.data;
      this.filterDate();
      });
  }

  filterDate() {
    this.spinner = true;

    switch (this.type)
          {
          case 'this week':
                  this.startDate = new Date();
                  this.startDate.setDate(this.startDate.getDate() - this.startDate.getDay());
                  this.endDate = new Date();                  
                  break;
          case 'this month':
                  this.startDate = new Date();
                  this.startDate.setDate(1);
                  this.endDate = new Date();
                  break;
          case 'this year':
                  this.startDate = new Date();
                  this.startDate.setMonth(0);
                  this.startDate.setDate(1);
                  this.endDate = new Date();
                  this.endDate.setMonth(11);
                  this.endDate.setDate(31);
                  break;
          case 'last week':
                  this.startDate = new Date();
                  this.startDate.setDate(this.startDate.getDate() - this.startDate.getDay() - 7);
                  this.endDate = new Date();
                  this.endDate.setDate(this.endDate.getDate() - this.startDate.getDay() - 1);
                break;
          case 'last month':
                  this.startDate = new Date();
                  this.startDate.setMonth(this.startDate.getMonth() - 1);
                  this.startDate.setDate(1);
                  this.endDate = new Date();
                  this.endDate.setDate(0);
                  break;
          case 'last year':
                  this.startDate = new Date();
                  this.startDate.setMonth(0);
                  this.startDate.setDate(1);
                  this.startDate.setFullYear(this.startDate.getFullYear() - 1);
                  this.endDate = new Date();
                  this.endDate.setFullYear(this.startDate.getFullYear());
                  this.endDate.setMonth(11);
                  this.endDate.setDate(31);
                  break;
          default:
                  this.startDate = new Date();
                  this.startDate.setMonth(0);
                  this.startDate.setDate(1);
                  this.startDate.setFullYear(2018);
                  this.endDate = new Date(); 
          }
    this.getValuesAdmin(this.startDate, this.endDate)
  }

  getValuesAdmin(startDate?: Date, endDate?: Date) {
    let projectsUser: Project[];
    let hours: number;

    for (let user of this.users) {
      this.reportService.getReports(startDate, endDate, '', user.id).subscribe((reports: Response<Report[]>) => {
        this.reports = reports.data;
        projectsUser = [];
        hours = 0;
        this.projectReportId.clear();
        for (let report of this.reports) {
          hours += report.time;
          if ( !this.projectReportId.has(report.projects.id)) {
            this.projectReportId.add(report.projects.id); 
            projectsUser = [...projectsUser, report.projects];
          }
        }
          this.userProjects.set(user.id, projectsUser);
          this.userReportsTime.set(user.id, hours);  
          this.spinner = false;
      });
    }
  }  

  progresPercent(spentTime: number, estimatedDuration: number) {
    return spentTime * 100 / estimatedDuration;
  }

  cleanRangeDate() {
   }

  ngOnDestroy() {
    this.alive = false;
  }
}
