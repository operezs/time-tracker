import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { User } from './../@core/models/user';
import { Response } from './../@core/models/response';
import { UserService } from './../@core/data/users.service';
import { Role } from './../@core/models/role';
import { UserRoleService } from './../@core/data/user-role.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[] = [];
  // menu = MENU_ITEMS;
  role: string;
  userId: string;

  constructor( private userService: UserService,
               private roleService: UserRoleService ) {
    this.userService.getUsers().subscribe((users: Response<User[]>) => {
    this.userId = this.userService.getDecodedAccessToken().id;
    this.userService.getUser(this.userId).subscribe((user: Response<User>) => {      
      if (user.data.roleId) {
         this.roleService.getRole(user.data.roleId).subscribe((role: Response<Role>) => {
            if (role.data.roleName === 'Admin') {
              this.menu = MENU_ITEMS;
            } else {
              const item = MENU_ITEMS[1];
              this.menu = [...this.menu, item];
            } 
         });


        } else {
          const item = MENU_ITEMS[1];
          this.menu = [...this.menu, item];
        }
    });
  });
}



}
