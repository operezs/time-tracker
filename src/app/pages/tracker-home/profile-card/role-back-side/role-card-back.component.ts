import { Component, Input } from '@angular/core';
import { Role } from './../../../../@core/models/role';

@Component({
  selector: 'ngx-role-card-back',
  styleUrls: ['./role-card-back.component.scss'],
  templateUrl: './role-card-back.component.html',
})
export class RoleCardBackComponent {

  @Input() role: Role;
  
  constructor() { }

  ngOnInit() {
  }

  paymentHour(basicSalary: number, payExtraHours: number ) {
    return basicSalary / payExtraHours;
  }

}
