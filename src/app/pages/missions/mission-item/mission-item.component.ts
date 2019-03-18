import { ChangeDetectionStrategy, OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-mission-item',
  templateUrl: './mission-item.component.html',
  styleUrls: ['./mission-item.component.scss']
})
export class MissionItemComponent implements OnInit {

  /**
   * If the panel is opened or closed
   */
  @Input() opened = false;

  /**
   * Text to display in the group title bar
   */
  @Input() title: string;

  /**
   * Emitted when user clicks on group titlebar
   * @type {EventEmitter<any>}
   */
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();

  @Input() users;

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

  source: LocalDataSource = new LocalDataSource();

  constructor() { }

  ngOnInit() {
    this.source.load(this.users);
  }

  getTime() {
    let totalTime = 0;
    this.users.forEach(user => {
      totalTime += user.time;
    });
    return totalTime;
  }

}
