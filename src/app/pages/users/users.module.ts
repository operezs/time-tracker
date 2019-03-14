
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {DpDatePickerModule} from 'ng2-date-picker';




import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserInfoComponent } from './user-info/user-info.component';

import { UserActionsComponent } from './user-actions.component';
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
    DpDatePickerModule,

  ],
  declarations: [
    UserActionsComponent,
    AddUserComponent,
    UserListComponent,
    UserInfoComponent,
    UsersComponent,
    UserPaymentComponent,
    UserCardComponent,
    ProjectCardComponent,
  ],
  entryComponents: [
    UserActionsComponent,
    AddUserComponent,
    UserPaymentComponent
  ],
  providers: [
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
