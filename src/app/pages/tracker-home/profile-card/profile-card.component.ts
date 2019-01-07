import { Component, Input } from '@angular/core';
import { Role } from './../../../@core/models/role';
import { User } from './../../../@core/models/user';

@Component({
  selector: 'ngx-profile-card',
  styleUrls: ['./profile-card.component.scss'],
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {

  flipped = false;
  
  @Input() user: User;
  @Input() role: Role;

  toggleView() {
    this.flipped = !this.flipped;
  }
}
