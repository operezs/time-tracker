import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../../../@core/models/role';






@Component({
  selector: 'ngx-role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss'],
})
export class RoleInfoComponent implements OnInit {

  role: Role;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  closeModal() {
    this.activeModal.close();
  }

}
