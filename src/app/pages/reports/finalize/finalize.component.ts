import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../@core/models/user';
import { Invoice, IInvoice } from '../../../@core/models/invoice';
import { InvoiceService } from '../../../@core/data/invoice.service';
import { ReportService } from '../../../@core/data/report.service';
import { ApiResponse } from '../../../@core/models/response';

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
  spinner: boolean;
  selectedOption: number;
  months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];
  monthOptions = [];

  constructor(private activeModal: NgbActiveModal,
    private reportService: ReportService,
    private invoiceService: InvoiceService) { }

  ngOnInit() {
    const currentDate: Date = new Date();
    this.monthOptions.push({
      month: (currentDate.getMonth() - 1)? currentDate.getMonth() - 1 : 12,
      year: (currentDate.getMonth() - 1)? currentDate.getFullYear() : currentDate.getFullYear() - 1
    });
    this.monthOptions.push({
      month: currentDate.getMonth(),
      year: currentDate.getFullYear()
    });
    if(!this.invoice) {
      this.selectedOption = 0;
      this.invoice = new Invoice(this.user, 0, 0, 0, this.monthOptions[0].month + 1, this.monthOptions[0].year);
      this.changeMonth();
    }
  }

  closeModal() {    
    this.activeModal.close();
  }

  onSave() {
    this.save.emit();
  }

  changeMonth() {
    this.invoice.month = this.monthOptions[this.selectedOption].month + 1;
    this.invoice.year = this.monthOptions[this.selectedOption].year;
    this.spinner = true;
    const startDate: Date = new Date(this.monthOptions[this.selectedOption].year, this.monthOptions[this.selectedOption].month, 1);
    const endDate: Date = new Date(this.monthOptions[this.selectedOption].year, this.monthOptions[this.selectedOption].month + 1, 0);
    this.getTime(startDate, endDate);
  }

  getTime(startDate?: Date, endDate?: Date) {
    this.reportService.getTotalHours(startDate, endDate, this.user.id)
      .subscribe((total: ApiResponse<number>) => {
        this.invoice.time = total.data;
        this.recalculateTotal();
        this.spinner = false;
      });
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
