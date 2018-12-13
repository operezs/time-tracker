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
        this.menu = MENU_ITEMS;
    } else {
        const item = MENU_ITEMS[1];
        this.menu = [...this.menu, item];
      } 
  }



}
