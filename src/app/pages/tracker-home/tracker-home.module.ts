import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ThemeModule } from '../../@theme/theme.module';
import { TrackerHomeComponent } from './tracker-home.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { TrackerHomeChartsPanelComponent } from './charts-panel/charts-panel.component';
import { OrdersChartComponent } from './charts-panel/charts/orders-chart.component';
import { ProfitChartComponent } from './charts-panel/charts/profit-chart.component';
import { ChartPanelHeaderComponent } from './charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ChartModule } from 'angular2-chartjs';
import { RoleCardBackComponent } from './profile-card/role-back-side/role-card-back.component';
import { UserCardFrontComponent } from './profile-card/user-front-side/user-card-front.component';
import { TrafficRevealCardComponent } from './traffic-reveal-card/traffic-reveal-card.component';
import { TrafficBarComponent } from './traffic-reveal-card/front-side/traffic-bar/traffic-bar.component';
import { TrafficFrontCardComponent } from './traffic-reveal-card/front-side/traffic-front-card.component';
import { TrafficCardsHeaderComponent } from './traffic-reveal-card/traffic-cards-header/traffic-cards-header.component';
import { TrafficBackCardComponent } from './traffic-reveal-card/back-side/traffic-back-card.component';
import { TrafficBarChartComponent } from './traffic-reveal-card/back-side/traffic-bar-chart.component';
import {
  TrackerHomeVisitorsAnalyticsComponent,
} from './visitors-analytics/visitors-analytics.component';
import {
  TrackerHomeVisitorsAnalyticsChartComponent,
} from './visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import {
  TrackerHomeVisitorsStatisticsComponent,
} from './visitors-analytics/visitors-statistics/visitors-statistics.component';
import { TrackerHomeLegendChartComponent } from './legend-chart/legend-chart.component';
import { TrackerHomeUserActivityComponent } from './user-activity/user-activity.component';
import { TrackerHomeProjectActivityComponent } from './project-activity/project-activity.component';
import { SlideOutComponent } from './slide-out/slide-out.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SoldevCardComponent } from './soldev-card/soldev-card.component';
import { SoldevCardBackComponent } from './soldev-card/back-side/soldev-card-back.component';
import { SoldevPieChartComponent } from './soldev-card/back-side/soldev-pie-chart.component';
import { SoldevCardFrontComponent } from './soldev-card/front-side/soldev-card-front.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    TrackerHomeComponent,
    UserCardFrontComponent,
    ProfileCardComponent,
    RoleCardBackComponent,
    TrackerHomeChartsPanelComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    OrdersChartComponent,
    ProfitChartComponent,
    TrafficRevealCardComponent,
    TrafficBarChartComponent,
    TrafficFrontCardComponent,
    TrafficBackCardComponent,
    TrafficBarComponent,
    TrafficCardsHeaderComponent,
    TrackerHomeVisitorsAnalyticsComponent,
    TrackerHomeVisitorsAnalyticsChartComponent,
    TrackerHomeVisitorsStatisticsComponent,
    TrackerHomeLegendChartComponent,
    TrackerHomeUserActivityComponent,
    TrackerHomeProjectActivityComponent,
    SlideOutComponent,
    SoldevCardComponent,
    SoldevCardFrontComponent,
    SoldevCardBackComponent,
    SoldevPieChartComponent,
  ],
  providers: [
  ],
})
export class TrackerHomeModule { }
