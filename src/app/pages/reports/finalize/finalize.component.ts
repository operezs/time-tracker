import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../@core/models/user';
import { Invoice, IInvoice } from '../../../@core/models/invoice';
import { InvoiceService } from '../../../@core/data/invoice.service';
import { ReportService } from '../../../@core/data/report.service';
import { ApiResponse } from '../../../@core/models/response';
import { ArchiveService } from '../../../@core/data/archive.service';

@Component({
  selector: 'ngx-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss']
})
export class FinalizeComponent implements OnInit {

  user: User;
  invoice: Invoice;
  time: number;
  @Output() save = new EventEmitter();
  // selectedOption: number;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  // monthOptions = [];

  constructor(private activeModal: NgbActiveModal,
    private reportService: ReportService,
    private invoiceService: InvoiceService) { }

  ngOnInit() {
  }

  closeModal() {    
    this.activeModal.close();
  }

  onSave() {
    this.save.emit();
  }

  recalculateTotal() {
    this.invoice.totalCUC = this.user.salary / 180.00 * this.invoice.time + this.invoice.extra + this.invoice.internet;
  }

  onSubmit() {
    const createInvoice: IInvoice = new IInvoice(this.invoice);
    this.invoiceService.createInvoice(createInvoice).subscribe( data => {
      this.closeModal();
      this.onSave();
    });
  }
}
