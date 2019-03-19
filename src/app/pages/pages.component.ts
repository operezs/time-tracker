import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { UserService } from './../@core/data/users.service';

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

  constructor( private userService: UserService ) {
   
    this.role = this.userService.getDecodedAccessToken().roleName;
    if (this.role === 'Admin') {
      this.menu = [...this.menu, MENU_ITEMS[0], MENU_ITEMS[1], MENU_ITEMS[3], MENU_ITEMS[4], MENU_ITEMS[5]];
    } else {
      this.menu = [...this.menu, MENU_ITEMS[0], MENU_ITEMS[1], MENU_ITEMS[2]/*, MENU_ITEMS[5]*/];
    }
  }
}
