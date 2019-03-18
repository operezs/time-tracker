import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../@core/data/mission.service';
import { ApiResponse } from '../../@core/models/response';
import { Mission } from '../../@core/models/mission';

@Component({
  selector: 'ngx-missions',
  template: `
  <div class="row">
    <div class="col-md-12">
      <nb-card size="large">
        <nb-card-header>
          <div>Missions</div>
        </nb-card-header>
        <nb-card-body>
          <ngx-mission-list *ngIf="missions" [missions]="missions"></ngx-mission-list>
        </nb-card-body>
      </nb-card>
    </div>
  </div>`
})
export class MissionsComponent implements OnInit {

  missions: Mission[]

  constructor(private missionService: MissionService) { }

  ngOnInit() {
    const date = new Date(), year = date.getFullYear(), month = date.getMonth();
    const startDate: Date = new Date(year, month, 1);
    const endDate: Date = new Date(year, month + 1, 0);
    this.missionService.getMissions(startDate, endDate).subscribe((missions: ApiResponse<Mission[]>) => {
      this.missions = missions.data;
    });
  }

}
