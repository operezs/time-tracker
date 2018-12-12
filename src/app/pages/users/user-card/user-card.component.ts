import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../@core/models/user';
import { Role } from './../../../@core/models/role';

@Component({
  selector: 'ngx-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  
  @Input() user: User;
  @Input() role: Role;

  username: string = '';
  
  constructor() { }

  ngOnInit() {
  }

}
