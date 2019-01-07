import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

// import { DashboardModule } from './dashboard/dashboard.module';
import { TrackerHomeModule } from './tracker-home/tracker-home.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ProjectsModule } from './projects/projects.module';
import { FormsModule } from '@angular/forms';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
   // DashboardModule,
   TrackerHomeModule,
   // MiscellaneousModule,
    UsersModule,
    ProjectsModule,
    ReportsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
