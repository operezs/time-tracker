import { AddRoleComponent } from './../add-role/add-role.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Role } from '../../../@core/models/role';
import { RoleInfoComponent } from './../role-info/role-info.component';
import { RoleActionsComponent } from './../role-actions.component';
import { UserRoleService } from './../../../@core/data/user-role.service';
import { Response } from '../../../@core/models/response';




@Component({
  selector: 'ngx-user-role',
  templateUrl: './user-role.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UserRoleComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "Loading, please wait...",

    columns: {
      roleName: {
        title: 'Role',
        type: 'string',
        filter: true,
      },
      workMode: {
        title: 'Work Mode',
        type: 'number',
        filter: true,
      },
      basicSalary: {
        title: 'Basic Salary',
        type: 'number',
        filter: true,
      },
      payExtraHours: {
        title: 'Pay Hours:',
        type: 'number',
        filter: true,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: RoleActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(role => {
            this.editRole(role);
          });
          instance.delete.subscribe(role => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.service.deleteRole(role.id).subscribe( data => {
                this.getTableData();
              });
            }
          });
          instance.view.subscribe(role => {
            this.onView(role);
          });
        },
        width: '10%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() roleSelected = new EventEmitter();

  constructor(private service: UserRoleService,
              private modalService: NgbModal) { }

  openAddRoleModal() {
    const modal: NgbModalRef = this.modalService.open(AddRoleComponent, { size: 'sm', container: 'nb-layout' });
    (<AddRoleComponent>modal.componentInstance).titleForm = 'New Role';
    (<AddRoleComponent>modal.componentInstance).save.subscribe(data => {
     this.getTableData();
   });
  }

  editRole(role) {
    const modal: NgbModalRef = this.modalService.open(AddRoleComponent, { size: 'sm', container: 'nb-layout' });
    (<AddRoleComponent>modal.componentInstance).role = role;
    (<AddRoleComponent>modal.componentInstance).titleForm = 'Edit Role';
    (<AddRoleComponent>modal.componentInstance).save.subscribe(data => {
      this.getTableData();
    });
  }

  onView(role): void {
    const modal: NgbModalRef = this.modalService.open(RoleInfoComponent, { size: 'sm', container: 'nb-layout' });
    (<RoleInfoComponent>modal.componentInstance).role = role;
  }

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.service.getRoles()
    .subscribe((roles: Response<Role[]>) => {
      this.source.load(roles.data);
    });
  }

}

