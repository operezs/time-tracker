import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Invoice } from '../../../@core/models/invoice';
import { ApiResponse } from '../../../@core/models/response';
import { InvoiceService } from '../../../@core/data/invoice.service';

@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "There are no data related to your request ...",

    columns: {
      users: {
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

  constructor(private service: InvoiceService) { }

  ngOnInit() {
    this.spinner = true;
  }

  getTableData(month?: number, year?: number) {
    this.service.getInvoices(month, year)
                .subscribe((invoices: ApiResponse<Invoice[]>) => {
      this.source.load(invoices.data);
      this.spinner = false;
    });
  }
}
