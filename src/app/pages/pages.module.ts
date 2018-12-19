import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

// import { DashboardModule } from './dashboard/dashboard.module';
// import { ECommerceModule } from './e-commerce/e-commerce.module';
// import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ProjectsModule } from './projects/projects.module';
import { FormsModule } from '@angular/forms';
import { ExpensesModule } from './expenses/expenses.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    FormsModule,
   // DashboardModule,
   // ECommerceModule,
   // MiscellaneousModule,
    UsersModule,
    ProjectsModule,
    ReportsModule,
    ExpensesModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
