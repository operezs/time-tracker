import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../@core/models/user';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../@core/data/invoice.service';

@Component({
  selector: 'ngx-archive-item',
  templateUrl: './archive-item.component.html',
  styleUrls: ['./archive-item.component.scss']
})
export class ArchiveItemComponent implements OnInit {

  @Output() report = new EventEmitter();
  @Output() invoice = new EventEmitter();
  @Input() year: number;
  @Input() month: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];

  constructor() { }

  ngOnInit() {
  }

  getMonthName(index: number) {
    return this.months[index - 1] || 'NULL';
  }

  showReport() {
    this.report.emit();
  }

  showInvoice() {
    this.invoice.emit();
  }

}
