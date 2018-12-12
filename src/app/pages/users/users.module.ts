
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { UsersComponent } from './users/users.component';
import { RoleInfoComponent } from './role-info/role-info.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { ProjectInfoComponent } from './../projects/project-info/project-info.component';
import { RoleActionsComponent } from './role-actions.component';
import { UserActionsComponent } from './user-actions.component';

import { UserRoleService } from './../../@core/data/user-role.service';
import { UserService } from './../../@core/data/users.service';

import { TokenInterceptor } from '../../@core/utils/token.interceptor';

import { ReportsModule } from './../reports/reports.module';
import { UserCardComponent } from './user-card/user-card.component';
import { ProjectCardComponent } from './project-card/project-card.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule,
    ReportsModule,

  ],
  declarations: [
    UserActionsComponent,
    AddUserComponent,
    UserListComponent,
    UserRoleComponent,
    RoleActionsComponent,
    AddRoleComponent,
    RoleInfoComponent,
    UserInfoComponent,
    UsersComponent,
    UserPaymentComponent,
    UserCardComponent,
    ProjectCardComponent,



  ],
  entryComponents: [
    UserActionsComponent,
    RoleInfoComponent,
    RoleActionsComponent,
    AddUserComponent,
    AddRoleComponent,
    UserPaymentComponent,
    

  ],
  providers: [
    UserRoleService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    /*{ provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class UsersModule { }
