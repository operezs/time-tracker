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
  user: User;
  project: Project[];
  
  @Input() userInfoView: User;
  @Input() userInfo: boolean;

    // Date Piker
    min: Date;
    max: Date;
    rangeDate: any;

  

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
    noDataMessage: "There are no data related to your request ...",

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
                this.dataFilter();
              });
            }
          });
          instance.view.subscribe(report => {
            this.onView(report);
          });
        },
        width: '10%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() reportSelected = new EventEmitter();

  constructor(private service: ReportService,
              private modalService: NgbModal,
              private projectService: ProjectService,
              private userService: UserService,
              protected dateService: NbDateService<Date>) {
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
    }

  openAddReportModal() {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'sm', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).titleForm = 'New Report';
    (<AddReportComponent>modal.componentInstance).user = this.user;
    (<AddReportComponent>modal.componentInstance).projects = this.project;
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.dataFilter();
    });
  }

  editReport(report) {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'sm', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).report = report;
    (<AddReportComponent>modal.componentInstance).projects = this.project;
    (<AddReportComponent>modal.componentInstance).titleForm = 'Edit Report';
    (<AddReportComponent>modal.componentInstance).user = this.user;
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.dataFilter();
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
    if (!this.userInfo) {
        const userId = this.userService.getDecodedAccessToken().id;
            this.userService.getUser(userId).subscribe((user: Response<User>) => {
              this.user = user.data;
              this.userService.getUsers().subscribe((users: Response<User[]>) => {
                this.dropdownUserList = users.data; 
                });
              this.getProjectList(this.user.id);  
            });  
        }
    else {
      this.user = this.userInfoView;
      this.getProjectList(this.user.id);
    }  
    this.dataFilter();
  }

  getProjectList(userid: string) {
    const roleName = this.userService.getDecodedAccessToken().roleName;
    if (roleName === 'Admin') {
        this.admin = true;

        this.projectService.getProjects().subscribe((project: Response<Project[]>) => {
          this.dropdownProjectList = project.data;
          this.project = project.data;   
          }); 

    } else {
      this.projectService.getProjectsUser(userid).subscribe((projects: Response<Project[]>) => {
        this.dropdownProjectList = projects.data;
        this.project = projects.data;   
        }); 
    }
  }

  dataFilter() {
    let projectId = ''; 
    let userId = '';
    let startDate: Date = null;
    let endDate: Date = null;
   
    if (this.projectAssignedItems.length !== 0)
        projectId = this.projectAssignedItems[0].id;
   
    if (this.userAssignedItems.length !== 0)        
        userId = this.userAssignedItems[0].id;
     
    if (this.rangeDate) {
      startDate = this.rangeDate.start;
      endDate = this.rangeDate.end; 
    }
    if (!this.userInfo)
           this.getTableData(startDate, endDate, projectId, userId);
        else
           this.getTableData(startDate, endDate, projectId, this.user.id);
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

  cleanRangeDate() {
   this.rangeDate = '';
  }

    // projectMultiSelect
    onProjectSelect(item: any) {
    }
  
    // userMultiSelect
    onUserSelect(item: any) {
    }


}
