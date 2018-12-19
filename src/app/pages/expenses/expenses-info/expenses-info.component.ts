import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Report } from '../../../@core/models/report';



@Component({
  selector: 'ngx-expenses-info',
  templateUrl: './expenses-info.component.html',
  styleUrls: ['./expenses-info.component.scss'],
})
export class ExpensesInfoComponent implements OnInit {

  report: Report;
  titleForm: string;
 
  dateReport: string;

  constructor(private activeModal: NgbActiveModal ) { }

  ngOnInit() {
    this.getDate();
    }


  getDate() {
   let date = `${this.report.date}`;
   this.dateReport = `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`;
  }

  closeModal() {
    this.activeModal.close();
  }
}
