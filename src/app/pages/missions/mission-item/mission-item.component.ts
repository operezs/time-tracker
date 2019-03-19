import { OnInit, Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-mission-item',
  templateUrl: './mission-item.component.html',
  styleUrls: ['./mission-item.component.scss']
})
export class MissionItemComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {
    
  }

}
