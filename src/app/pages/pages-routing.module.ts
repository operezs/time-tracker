import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsersComponent } from './users/users/users.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { AuthGuardAdmin } from './../@core/data/auth-guard-admin.service';
import { InvoicesComponent } from './reports/invoices/invoices.component';
import { ArchivesComponent } from './archives/archives/archives.component';
import { MissionsComponent } from './missions/missions.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: TrackerHomeComponent,
    },
    {
      path: 'reports',
      component: ReportListComponent,
    },
    {
      path: 'reports/invoices',
      canActivate: [AuthGuardAdmin],
      component: InvoicesComponent,
    },
    {
      path: 'reports/missions',
      canActivate: [AuthGuardAdmin],
      component: MissionsComponent,
    },
    {
      path: 'reports/archives',
      component: ArchivesComponent,
    },
    {
      path: 'users',
      canActivate: [AuthGuardAdmin],
      component: UsersComponent,
    },
    {
      path: 'projects',
      // canActivate: [AuthGuardAdmin],
      component: ProjectListComponent,
    }, 


/*


    // theme  
  {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'modal-overlays',
    loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
  }, {
    path: 'extra-components',
    loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
  }, {
    path: 'bootstrap',
    loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
  }, {
    path: 'maps',
    loadChildren: './maps/maps.module#MapsModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'editors',
    loadChildren: './editors/editors.module#EditorsModule',
  }, {
    path: 'forms',
    loadChildren: './forms/forms.module#FormsModule',
  }, {
    path: 'tables',
    loadChildren: './tables/tables.module#TablesModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  } */],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
