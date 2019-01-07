import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';
// import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { UsersComponent } from './users/users/users.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ReportListComponent } from './reports/report-list/report-list.component';
import { UserRoleComponent } from './users/user-role/user-role.component';
import { AuthGuardAdmin } from './../@core/data/auth-guard-admin.service';



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
    }, {
      path: 'users',
      canActivate: [AuthGuardAdmin],
      component: UsersComponent,
    }, {
      path: 'users/user-role',
      canActivate: [AuthGuardAdmin],
      component: UserRoleComponent,
    }, {
      path: 'projects',
      // canActivate: [AuthGuardAdmin],
      component: ProjectListComponent,
    }, 


    // theme  
  /* {
    path: 'dashboard',
    component: ECommerceComponent,
  }, {
    path: 'iot-dashboard',
    component: DashboardComponent,
  },  {
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
  }, */ {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, /* {
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
