import { Component, OnInit } from '@angular/core';
import { User } from '../../../@core/models/user';
import { ArchiveService } from '../../../@core/data/archive.service';
import { ApiResponse } from '../../../@core/models/response';
import { UserService } from '../../../@core/data/users.service';

@Component({
  selector: 'ngx-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.scss']
})
export class ArchivesComponent implements OnInit {

  roleName: string;
  selectedUser: User;

  constructor(private archiveService: ArchiveService,
    private userService: UserService) { }

  ngOnInit() {
    this.roleName = this.userService.getDecodedAccessToken().roleName;
    if (this.roleName != 'Admin') {
      const userId: string = this.userService.getDecodedAccessToken().id;
      this.userService.getUser(userId).subscribe((user: ApiResponse<User>) => {
        this.selectedUser = user.data;
      });
    }
  }

  selectUser(user: User) {
    console.log(JSON.stringify(user));
    this.selectedUser = user;
  }

  unselectUser() {
    this.selectedUser = null;
  }
}