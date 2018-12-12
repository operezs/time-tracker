import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

import { ReportActionsComponent } from '../report-actions.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportInfoComponent } from './../report-info/report-info.component';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';
import { Response } from '../../../@core/models/response';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';
import { Role } from './../../../@core/models/role';
import { UserRoleService } from '../../../@core/data/user-role.service';

@Component({
  selector: 'ngx-report-list',
  templateUrl: './report-list.component.html',
  styles: ['./add-report.component.scss',
  `
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ReportListComponent implements OnInit {
  timeLoged = 0;
  filters =  false;
  status = 'Show';
  admin = false;
  @Input() userInfo: boolean;

    // Date Piker
    min: Date;
    max: Date;
    rangeDate: any;

  private project: Project[];
  userList: User[];
  userLog: User;

  projectAssignedItems = [];
  dropdownProjectList = [];

  dropdownProjectSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'projectName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
    class:"custom-class",
  };


  userAssignedItems = [];
  dropdownUserList = [];

  dropdownUserSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'firstName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  settings = {
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
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.firstName}`;
          return name;
        }
      },
      projects: {
        title: 'Project',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.projectName}`;
          return name;
          }
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
        width: '14%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() reportSelected = new EventEmitter();

  constructor(private service: ReportService,
              private modalService: NgbModal,
              private projectService: ProjectService,
              private userService: UserService,
              private roleService: UserRoleService,
              protected dateService: NbDateService<Date>) {
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
    }

  openAddReportModal() {
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
  }

  ngOnInit() {
    this.getData();    
  }

  getData() {
    this.userService.getUsers().subscribe((users: Response<User[]>) => {
      const userId = this.userService.getDecodedAccessToken().id;
      this.userService.getUser(userId).subscribe((user: Response<User>) => {
        this.userLog = user.data;
        if (this.userLog.roleId)
            this.roleService.getRole(this.userLog.roleId).subscribe((role: Response<Role>) => {
              if (role.data.roleName === 'Admin')
                  this.admin = true;
            });
        
      });
      const user2: User[] = [];
      for (const user of users.data) {
        if (!user.isDeleted)
            user2.push(user);
      }
      this.userList = user2;
      this.dropdownUserList = user2;
      this.projectService.getProjects().subscribe((project: Response<Project[]>) => {
           this.dropdownProjectList = project.data;
           this.project = project.data;
           this.getTableData();
     });
    });

  }

  getTableData(startDate?: Date, endDate?: Date, projectId?: string, userId?: string) {
    this.service.getReports(startDate, endDate, projectId, userId)
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

  }
  

  dataFilter() {
    /* let projectId = ''; 
    let userId = '';
    let startDate = new Date();
    let endDate = new Date();

   projectId = this.projectAssignedItems[0].id;
    userId = this.userAssignedItems[0].id;
    startDate = this.rangeDate.start;
    endDate = this.rangeDate.end; 

    this.getTableData(startDate, endDate, projectId, userId);
 */
    alert('Filters: Not implemented yet');
    }

    // projectMultiSelect
    onProjectSelect(item: any) {
    }
  
    // userMultiSelect
    onUserSelect(item: any) {
    }


}
