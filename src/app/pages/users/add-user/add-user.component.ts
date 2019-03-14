import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../../@core/models/user';
import { UserService } from '../../../@core/data/users.service';
import { ApiResponse } from '../../../@core/models/response';


@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  user: User;
  titleForm: string;
  checkPassword: string;
  password: string;

  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private userService: UserService) {
    if (!this.user) {
      this.user = new User();
    }
  }

  ngOnInit() {
    // this.getItemsDropdown();
  }

  closeModal() {
    this.activeModal.close();
  }


  onSubmit() {
    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {
      // --no
      this.user.isDeleted = 0;
      // --
      this.userService.createUser(this.user).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  onSave() {
    this.save.emit();
  }

  onSelectAll(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

}
