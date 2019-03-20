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
  @Output() back = new EventEmitter();
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
      user: {
        title: 'Developer Name',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.firstName}`;
          return name;
        }
      },
      /*project: {
        title: 'Project',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.projectName}`;
          return name;
        }
      },*/
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
    const startDate: Date = new Date(this.year, this.month - 1, 1);
    const endDate: Date = new Date(this.year, this.month, 0);
    this.getTableData(this.user.id, startDate, endDate);
  }

  getTableData(userId?: string, startDate?: Date, endDate?: Date) {
    this.service.getReportsByDate(userId, startDate, endDate)
      .subscribe((reports: ApiResponse<Report[]>) => {
        this.source.load(reports.data);
        this.calcTotalTime(reports.data);
        this.spinner = false;
      });
  }

  calcTotalTime(reports: Report[]) {
    this.totalTime = 0;
    reports.forEach((report: Report) => {
      this.totalTime = this.totalTime + + this.getTime(report);
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

  getMonthName(index: number) {
    return this.months[index - 1] || 'NULL';
  }

  goBack() {
    this.back.emit();
  }
}
