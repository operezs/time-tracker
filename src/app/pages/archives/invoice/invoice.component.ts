import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../@core/models/user';
import { InvoiceService } from '../../../@core/data/invoice.service';
import { ApiResponse } from '../../../@core/models/response';
import { Invoice } from '../../../@core/models/invoice';

@Component({
  selector: 'ngx-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input() user: User;
  @Input() month: number;
  @Input() year: number;
  @Input() invoice: Invoice;

  months: string[] = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  constructor(private invoiceService: InvoiceService,
    private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  getMonthName(index: number) {
    return this.months[index - 1] || 'NULL';
  }

  closeModal() {    
    this.activeModal.close();
  }
}
