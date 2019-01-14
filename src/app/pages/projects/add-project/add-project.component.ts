

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { Project } from '../../../@core/models/project';
import { ProjectService } from '../../../@core/data/project.service';

import { User } from '../../../@core/models/user';
import { UserService } from './../../../@core/data/users.service';
import { Response } from '../../../@core/models/response';



@Component({
  selector: 'ngx-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit {

  project: Project;
  titleForm: string;

  userAssignedItems = [];
  dropdownList = [];

  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'firstName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 8,
    allowSearchFilter: true,
  };


  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private projectService: ProjectService,
              private userService: UserService) {
    if (!this.project) {
      this.project = new Project('', 0, '');
    }
  }

  ngOnInit() {
    this.getItemsDropdown();
  }

  closeModal() {
    this.activeModal.close();
  }

  getItemsDropdown() {
      this.userService.getUsers().subscribe((users: Response<User[]>) => {
        const userDrop: User[] = [];
        for (const user of users.data) {
          if (!user.isDeleted) {
            userDrop.push(user);
          }
        }
        if (this.project.users)
            this.userAssignedItems = this.project.users;
        this.dropdownList = userDrop;
        });
  }

 userAssignedMultiSelect() {
  this.project.users = [];
  if (this.userAssignedItems.length !== 0) {
      for (let i = 0; i < this.userAssignedItems.length; i++) {
            this.project.users.push( this.userAssignedItems[i].id );
          }
    }
  }

 onSubmit() {
  this.userAssignedMultiSelect();
  
  if (this.project.id) {
      this.projectService.updateProject(this.project).subscribe( data => {
      this.closeModal();
      this.onSave();
    });
  } else {
      this.projectService.createProject(this.project).subscribe( data => {
      this.closeModal();
      this.onSave();
    });
  }
}

  onSave() {
    this.save.emit();
  }

  // MultiSelect
  onItemSelect(item: any) {
  //  this.multiDropdown.pushSelectedItems(item);
  }

  onSelectAll(item: any) {
  //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }
}
