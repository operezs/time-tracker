import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/data/users.service';
import { ApiResponse } from '../../../@core/models/response';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() select: EventEmitter<User> = new EventEmitter<User>();  
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users: ApiResponse<User[]>) => {
      this.users = users.data;
    });
  }

  selectUser(selectedUser: User) {
    this.select.emit(selectedUser);
  }
}
