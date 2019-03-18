import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionItemComponent } from './mission-item/mission-item.component';
import { UsersComponent } from './users/users.component';
import { MissionsComponent } from './missions.component';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    MissionListComponent, 
    MissionItemComponent, 
    UsersComponent, 
    MissionsComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule
  ]
})
export class MissionsModule { }
