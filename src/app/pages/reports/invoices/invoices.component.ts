import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Invoice } from '../../../@core/models/invoice';
import { ApiResponse } from '../../../@core/models/response';
import { InvoiceService } from '../../../@core/data/invoice.service';
import { ArchiveService } from '../../../@core/data/archive.service';

@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  /*selectedMonth: number;
  selectedYear: number;

  monthOptions = [
    { name: "Select month", value: 0 },
    { name: "January", value: 1 },
    { name: "February", value: 2 },
    { name: "March", value: 3 },
    { name: "April", value: 4 },
    { name: "May", value: 5 },
    { name: "June", value: 6 },
    { name: "July", value: 7 },
    { name: "August", value: 8 },
    { name: "September", value: 9 },
    { name: "October", value: 10 },
    { name: "November", value: 11 },
    { name: "December", value: 12 },
  ];

  yearOptions = [
    { name: "Select year", value: 0 },
    { name: "2019", value: 2019 },
    { name: "2020", value: 2020 },
    { name: "2021", value: 2021 },
    { name: "2022", value: 2022 }
  ];*/

  settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "There are no data related to your request ...",

    columns: {
      user: {
        title: 'Developer Name',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.firstName}`;
          return name;
        }
      },
      salary: {
        title: 'Salary',
        type: 'number',
        filter: true,
      },
      /*month: {
        title: 'Month',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let month = this.monthOptions[value].name;
          return month;
        }
      },
      year: {
        title: 'Year',
        type: 'number',
        filter: true,
      },*/
      time: {
        title: 'Hours',
        type: 'number',
        filter: true,
      },
      extra: {
        title: 'Extra',
        type: 'number',
        filter: true,
      },
      totalCUC: {
        title: 'Total CUC',
        type: 'number',
        filter: true,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  spinner: boolean;

  constructor(private service: InvoiceService,
    private archiveService: ArchiveService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    // this.selectedMonth = 0;
    // this.selectedYear = 0;
    this.spinner = true;
    this.getTableData();
  }

  getTableData() {
    this.service.getInvoices()
                .subscribe((invoices: ApiResponse<Invoice[]>) => {
      this.source.load(invoices.data);
      this.spinner = false;
    });
  }

  dataFilter() {
    this.spinner = true;
    this.getTableData();
  }

  finalizeMonth() {
    if (confirm('Are you sure?')) {
      this.spinner = true;
      this.archiveService.createArchive().subscribe((created: ApiResponse<Number>) => {
        this.showToast(created.data);
        this.spinner = false;
        this.dataFilter();
      });
    }
  }

  private showToast(archiveCount: Number) {
    const config = {
      status: NbToastStatus.INFO,
      destroyByClick: true,
      duration: 3000,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      hasIcon: true
    };

    this.toastrService.show(
      `${archiveCount}`,
      `Generated archives: `,
      config);
  }
}
