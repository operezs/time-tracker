import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDateService } from '@nebular/theme';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';
import { ApiResponse } from '../../../@core/models/response';
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
  totalTime = 0;
  @Input() user: User;
  @Input() month: number;
  @Input() year: number;
  spinner: boolean;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  
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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ReportService,
    protected dateService: NbDateService<Date>) { }

  
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner = true;
    const startDate: Date = new Date(this.year, this.month, 1);
    const endDate: Date = new Date(this.year, this.month + 1, 0);
    this.getTableData(startDate, endDate, this.user.id);
  }

  getTableData(startDate?: Date, endDate?: Date, userId?: string) {
    this.service.getReports(startDate, endDate, userId)
      .subscribe((reports: ApiResponse<Report[]>) => {
        this.source.load(reports.data);
        this.calcTotalTime(reports.data);
        this.spinner = false;
      });
  }

  calcTotalTime(reports: Report[]) {
    this.totalTime = 0;
    reports.forEach(report => {
      this.totalTime = this.totalTime + report.getTime();
    });
  }

  formatDate(date: string): string {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  getMonthName(index: number) {
    return this.months[index - 1] || 'NULL';
  }
}
