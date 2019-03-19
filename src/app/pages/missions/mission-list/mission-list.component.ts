import { Component, QueryList, OnInit, ViewChildren, Input } from '@angular/core';
import { MissionItemComponent } from '../mission-item/mission-item.component';
import { Mission } from '../../../@core/models/mission';
import { MissionService } from '../../../@core/data/mission.service';
import { ApiResponse } from '../../../@core/models/response';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  
  settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "There are no data related to your request ...",

    columns: {
      name: {
        title: 'Name',
        type: 'string',
        filter: true,
      },
      time: {
        title: 'Hours',
        type: 'string',
        filter: true,
      }
    },
  };
  
  @Input() missions: Mission[];

  constructor() { }

  ngOnInit() { }

  getTime(mission: Mission) {
    let totalTime = 0;
    mission.users.forEach(user => {
      totalTime += user.time;
    });
    return totalTime;
  }

  getTableData(mission: Mission) {
    let source: LocalDataSource = new LocalDataSource();
    source.load(mission.users);
    return source;
  }

  getProjectInitials(projectName: string) {
    let initials = '';
    const names: string[] = projectName.split(' ');
    names.forEach(name => {
      initials += name.charAt(0).toUpperCase();
    });
    return initials;
  }
}
