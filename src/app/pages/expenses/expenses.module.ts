import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';

import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { ExpensesInfoComponent } from './expenses-info/expenses-info.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesActionsComponent } from './expenses-actions.component';
import { ExpensesService } from '../../@core/data/expenses.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NbDatepickerModule } from '@nebular/theme';
// import { NbDateFnsDateModule } from '@nebular/date-fns';
// import { NbMomentDateModule } from '@nebular/moment';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule,
    NbDatepickerModule.forRoot(),
    NbDatepickerModule,
   // NbDateFnsDateModule,
  // NbMomentDateModule,
  ],
  declarations: [
    ExpensesActionsComponent,
    AddExpensesComponent,
    ExpensesListComponent,
    ExpensesInfoComponent,

  ],
  entryComponents: [
    ExpensesInfoComponent,
    ExpensesActionsComponent,
    AddExpensesComponent,
  ],
  providers: [
    ExpensesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
  exports: [
    ExpensesListComponent,
  ]
})
export class ExpensesModule { }
