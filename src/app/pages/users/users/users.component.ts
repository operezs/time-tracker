import { Component, OnInit } from '@angular/core';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersComponent implements OnInit {

  selectedUser: User = null;

  constructor() { }

  ngOnInit() {  
  }

  selectUser(event) {
    this.selectedUser = event;
  }

  unselectUser() {
    this.selectedUser = null;
  }

}

