import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { UserService } from './../../../@core/data/users.service';
import { User } from '../../../@core/models/user';
import { ApiResponse } from '../../../@core/models/response';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  firstName: string;
  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private router: Router) {
  }

  ngOnInit() {
    this.firstName = this.userService.getDecodedAccessToken().firstName;
    this.menuService.onItemClick().subscribe(( event ) => {
      this.onItemSelection(event.item.title);
   });
  }

  
  onItemSelection( title ) {
    if ( title === 'Log out' ) {
      localStorage.removeItem('auth_app_token');
      localStorage.removeItem('isLoggedin');
      this.router.navigate(['/login']);
    } else if ( title === 'Profile' ) {
      // Do something on Profile
      alert('Profile: Not implemented yet');
    }
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
