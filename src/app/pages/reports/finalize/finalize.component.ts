import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../@core/models/user';
import { Invoice } from '../../../@core/models/invoice';
import { timeInterval } from 'rxjs/operators';

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

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  closeModal() {    
    this.activeModal.close();
  }

  onSave() {
    this.save.emit();
  }

  initialize() {
    if(!this.invoice) {
      this.invoice = new Invoice(this.user, this.time, 0, 0);
      this.recalculateTotal();
    }
  }

  recalculateTotal() {
    this.invoice.totalCUC = this.user.salary ? this.user.salary : 0 / 180.00 * this.invoice.time + this.invoice.extra + this.invoice.internet;
  }

}
