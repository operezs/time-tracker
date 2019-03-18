import { Component, QueryList, OnInit, ViewChildren, Input } from '@angular/core';
import { MissionItemComponent } from '../mission-item/mission-item.component';
import { Mission } from '../../../@core/models/mission';
import { MissionService } from '../../../@core/data/mission.service';
import { ApiResponse } from '../../../@core/models/response';

@Component({
  selector: 'ngx-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  
  @Input() missions: Mission[];
  @ViewChildren(MissionItemComponent) groups: QueryList<MissionItemComponent>;

  constructor() { }

  ngOnInit() { }
  /**
   * Invoked when all children (groups) are ready
   */
  ngAfterViewInit() {
    // console.log (this.groups);
    // Set active to first element
    this.groups.toArray()[0].opened = true;
    // Loop through all Groups
    this.groups.toArray().forEach((t) => {
      // when title bar is clicked
      // (toggle is an @output event of Group)
      t.toggle.subscribe(() => {
        // Open the group
        this.openGroup(t);
      });
      /*t.toggle.subscribe((group) => {
        // Open the group
        this.openGroup(group);
      });*/
    });
  }

  /**
   * Open an accordion group
   * @param group   Group instance
   */
  openGroup(group: MissionItemComponent) {
    // close other groups
    this.groups.toArray().forEach((t) => t.opened = false);
    // open current group
    group.opened = true;
  }
}
