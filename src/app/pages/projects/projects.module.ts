


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ProjectActionsComponent } from './project-actions.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';



import { ProjectService } from '../../@core/data/project.service';
import { TokenInterceptor } from '../../@core/utils/token.interceptor';
import { ProjectListComponent } from './project-list/project-list.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    NgMultiSelectDropDownModule.forRoot(),

  ],
  declarations: [
    ProjectActionsComponent,
    AddProjectComponent,
    ProjectListComponent,
    ProjectInfoComponent,
  ],
  entryComponents: [
    ProjectActionsComponent,
    AddProjectComponent,
    ProjectInfoComponent,

  ],
  providers: [
    ProjectService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }, /*
    { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},*/
  ],
  exports: [
    ProjectInfoComponent,
  ]
})
export class ProjectsModule { }
