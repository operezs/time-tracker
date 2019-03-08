import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NbDatepickerModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { AddReportComponent } from './add-report/add-report.component';
import { ReportInfoComponent } from './report-info/report-info.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportActionsComponent } from './report-actions.component';
import { ReportService } from '../../@core/data/report.service';
import { InvoiceService } from '../../@core/data/invoice.service';
import { MissionService } from '../../@core/data/mission.service';
import { ArchiveService } from '../../@core/data/archive.service';
import { InvoicesComponent } from './invoices/invoices.component';
import { MissionsComponent } from './missions/missions.component';
import { FinalizeComponent } from './finalize/finalize.component';
import { TaskItemComponent } from './task-item/task-item.component';

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
    ReportActionsComponent,
    AddReportComponent,
    ReportListComponent,
    ReportInfoComponent,
    InvoicesComponent,
    MissionsComponent,
    FinalizeComponent,
    TaskItemComponent,

  ],
  entryComponents: [
    ReportInfoComponent,
    ReportActionsComponent,
    AddReportComponent,
    FinalizeComponent
  ],
  providers: [
    ReportService,
    InvoiceService,
    MissionService,
    ArchiveService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
  exports: [
    ReportListComponent,
  ]
})
export class ReportsModule { }
