import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../@core/data/mission.service';
import { ApiResponse } from '../../@core/models/response';
import { Mission } from '../../@core/models/mission';

@Component({
  selector: 'ngx-missions',
  template: `
      <nb-card size="large" [nbSpinner]="spinner" nbSpinnerSize="xxlarge">
        <nb-card-header>
          <div>Missions</div>
        </nb-card-header>
        <nb-card-body>
          <nb-alert *ngIf="!missions || missions.length == 0" status="info">There are no data related to your request ...</nb-alert>
          <ngx-mission-list *ngIf="missions" [missions]="missions"></ngx-mission-list>
        </nb-card-body>
      </nb-card>`
})
export class MissionsComponent implements OnInit {

  missions: Mission[];
  spinner = false;

  constructor(private missionService: MissionService) { }

  ngOnInit() {
    this.spinner = true;
    this.missionService.getMissions().subscribe((missions: ApiResponse<Mission[]>) => {
      this.missions = missions.data;
      this.spinner = false;
    });
  }

}
