import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ArchivesComponent } from './archives/archives.component';
import { UsersComponent } from './users/users.component';
import { ArchiveItemComponent } from './archive-item/archive-item.component';
import { ArchiveService } from '../../@core/data/archive.service';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { InvoiceService } from '../../@core/data/invoice.service';
import { ReportService } from '../../@core/data/report.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportListComponent } from './report-list/report-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [
    ArchivesComponent, 
    UsersComponent, 
    ArchiveItemComponent, 
    ReportListComponent, 
    ArchiveListComponent, 
    UserItemComponent, 
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    InvoiceComponent
  ],
  providers: [
    ArchiveService,
    InvoiceService,
    ReportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
})
export class ArchivesModule { }
