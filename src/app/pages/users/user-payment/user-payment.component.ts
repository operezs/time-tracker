import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../@core/models/user';
import { Project } from './../../../@core/models/project';
import { Role } from './../../../@core/models/role';


@Component({
  selector: 'ngx-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.scss'],
})
export class UserPaymentComponent implements OnInit {

  user: User;
  role: Role;
  userMonthWork = new Map();
  projectMonthPay = new Map();
  projects: Project[] = [];
  timeLogged: number = 0;
  userPay: number = 0;
  date: string;


  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    const payHours: number = this.role.basicSalary / this.role.payExtraHours; 
    let pay: number = 0;
    let workMonth = 0;
    for (let project of this.projects) {
         workMonth = this.userMonthWork.get(project.id);
         pay = workMonth * payHours;
         this.projectMonthPay.set(project.id, pay);
         this.userPay += pay;
         this.timeLogged += workMonth; 
    }
  }
   

  closeModal() {
    this.activeModal.close();
  }

}
