import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../@core/models/user';

@Component({
  selector: 'ngx-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Output() selected = new EventEmitter();
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  selectUser() {
    this.selected.emit();
  }

}
