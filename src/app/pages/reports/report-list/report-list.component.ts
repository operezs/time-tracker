import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

import { ReportActionsComponent } from '../report-actions.component';
import { AddReportComponent } from '../add-report/add-report.component';
import { ReportInfoComponent } from './../report-info/report-info.component';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';
import { ApiResponse } from '../../../@core/models/response';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';
import { FinalizeComponent } from '../finalize/finalize.component';
import { getLocaleTimeFormat } from '@angular/common';
import { InvoiceService } from '../../../@core/data/invoice.service';
import { ArchiveService } from '../../../@core/data/archive.service';
import { Invoice } from '../../../@core/models/invoice';

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
  totalTime = 0;
  filters = false;
  status = 'Show';
  admin = false;
  user: User;
  projects: Project[];
  month: any;
  invoice: Invoice;
  spinner: boolean;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  @Input() userInfoView: User;
  @Input() userInfo: boolean;

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
    class: "custom-class",
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
        sort: true,
        sortDirection: 'desc',
        valuePrepareFunction: (value) => {
          let date = this.formatDate(value);
          return date;
        }
      },
      user: {
        title: 'Developer Name',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.firstName}`;
          return name;
        }
      },
      tasks: {
        title: 'Time Work',
        type: 'number',
        filter: true,
        valuePrepareFunction: (value) => {
          let reportTime = 0;
          value.forEach(task => {
            reportTime += task.time;
          });
          return reportTime;
        }
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
              this.service.deleteReport(report.id).subscribe(data => {
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
    protected dateService: NbDateService<Date>,
    private invoiceService: InvoiceService,
    private archiveService: ArchiveService) {
    // this.min = this.dateService.addDay(this.dateService.today(), -5);
    // this.max = this.dateService.addDay(this.dateService.today(), 5);
  }

  generateInvoice() {
    this.spinner = true;
    this.invoiceService.getInvoice(this.user.id).subscribe((invoice: ApiResponse<Invoice>) => {
      this.invoice = invoice.data;
      this.spinner = false;
      this.openGenerateInvoiceModal();
    },
    error => {
      this.archiveService.getCurrentMonth().subscribe((current: ApiResponse<any>) => {
        this.service.getTotalHours(this.user.id).subscribe((totalHours: ApiResponse<number>) => {
          this.invoice = new Invoice(this.user, totalHours.data, 0, 0, current.data.month, current.data.year);
          this.spinner = false;
          this.openGenerateInvoiceModal();
        });
      });
    });    
  }

  openGenerateInvoiceModal() {
    const modal: NgbModalRef = this.modalService.open(FinalizeComponent, { size: 'sm', container: 'nb-layout' });
    (<FinalizeComponent>modal.componentInstance).user = this.user;
    (<FinalizeComponent>modal.componentInstance).time = this.totalTime;
    (<FinalizeComponent>modal.componentInstance).invoice = this.invoice;
    // (<FinalizeComponent>modal.componentInstance).initialize();
    // (<FinalizeComponent>modal.componentInstance).save.subscribe(data => {
    //   this.dataFilter();
    // });
  }

  openAddReportModal() {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).titleForm = 'New Report';
    (<AddReportComponent>modal.componentInstance).user = this.user;
    (<AddReportComponent>modal.componentInstance).projects = this.projects;
    (<AddReportComponent>modal.componentInstance).save.subscribe(data => {
      this.dataFilter();
    });
  }

  editReport(report) {
    const modal: NgbModalRef = this.modalService.open(AddReportComponent, { size: 'lg', container: 'nb-layout' });
    (<AddReportComponent>modal.componentInstance).report = report;
    (<AddReportComponent>modal.componentInstance).projects = this.projects;
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
    this.spinner = true;
    this.archiveService.getCurrentMonth().subscribe((current: ApiResponse<any>) => {
      this.month = current.data;
      this.getData();
    });
  }

  getData() {
    if (!this.userInfo) {
      const userId = this.userService.getDecodedAccessToken().id;
      this.userService.getUser(userId).subscribe((user: ApiResponse<User>) => {
        this.user = user.data;
        if (this.user.role === 'Admin') {
          this.userService.getUsers().subscribe((users: ApiResponse<User[]>) => {
            this.dropdownUserList = users.data;
          });
        }
        this.getProjectList(this.user.id);
      });
    }
    else {
      this.user = this.userInfoView;
      this.getProjectList(this.user.id);
    }
    this.dataFilter();
  }

  getProjectList(userId: string) {
    const roleName = this.userService.getDecodedAccessToken().roleName;
    if (roleName === 'Admin') {
      this.admin = true;

      this.projectService.getProjects().subscribe((projects: ApiResponse<Project[]>) => {
        this.dropdownProjectList = projects.data;
        this.projects = projects.data;
      });

    } else {
      this.projectService.getProjectsUser(userId).subscribe((projects: ApiResponse<Project[]>) => {
        this.dropdownProjectList = projects.data;
        this.projects = projects.data;
      });
    }
  }

  dataFilter() {
    this.spinner = true;

    let projectId = '';
    let userId = '';

    if (this.projectAssignedItems.length !== 0)
      projectId = this.projectAssignedItems[0].id;

    if (this.userAssignedItems.length !== 0)
      userId = this.userAssignedItems[0].id;

    if (!this.userInfo)
      this.getTableData(userId, projectId);
    else {
      this.getTableData(this.user.id, projectId);
    }
  }

  getTableData(userId?: string, projectId?: string) {
    this.service.getReports(userId, projectId)
      .subscribe((reports: ApiResponse<Report[]>) => {
        this.source.load(reports.data);
        this.calcTotalTime(reports.data);
        this.spinner = false;
      });
  }

  calcTotalTime(reports: Report[]) {
    this.totalTime = 0;
    reports.forEach(report => {
      this.totalTime = this.totalTime + this.getTime(report);
    });
  }

  getTime(report: Report) {
    let reportTime: number = 0;
    if (report.tasks) {
      report.tasks.forEach(task => {
        reportTime += task.time;
      });
    }
    return reportTime;
  }

  formatDate(date: string): string {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  getMonth() {
    if(this.month) {
      return this.months[this.month.month - 1];
    }
    return '';
  }

  // cleanRangeDate() {
  //   this.rangeDate = '';
  // }

  // projectMultiSelect
  onProjectSelect(item: any) {
  }

  // userMultiSelect
  onUserSelect(item: any) {
  }

}
