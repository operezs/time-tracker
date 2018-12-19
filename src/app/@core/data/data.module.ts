import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaService } from './media.service';
import { InstanceService } from './instance.service';
import { ProjectService } from './project.service';
import { UserRoleService } from './user-role.service';
import { UserThemeService } from './users-theme.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { UserActivityService } from './user-activity.service';
import { OrdersChartService } from './orders-chart.service';
import { ProfitChartService } from './profit-chart.service';
import { TrafficListService } from './traffic-list.service';
import { PeriodsService } from './periods.service';
import { EarningService } from './earning.service';
import { OrdersProfitChartService } from './orders-profit-chart.service';
import { TrafficBarService } from './traffic-bar.service';
import { ProfitBarAnimationChartService } from './profit-bar-animation-chart.service';
import { LayoutService } from './layout.service';
import { GlobalService } from './global.service';
import { AuthGuard } from './auth-guard.service';
import { AuthGuardAdmin } from './auth-guard-admin.service';
import { UserService } from './users.service';
import { ReportService } from './report.service';
import { ExpensesService } from './expenses.service';

const SERVICES = [
  UserThemeService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  UserActivityService,
  OrdersChartService,
  ProfitChartService,
  TrafficListService,
  PeriodsService,
  EarningService,
  OrdersProfitChartService,
  TrafficBarService,
  ProfitBarAnimationChartService,
  LayoutService,
  GlobalService,
  MediaService,
  InstanceService,
  AuthGuard,
  AuthGuardAdmin,
  ProjectService,
  ReportService,
  UserRoleService,
  UserService,
  ExpensesService,

];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
