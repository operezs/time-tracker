import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../@core/data/users.service';
import { User } from '../../@core/models/user';
import { ProjectService } from '../../@core/data/project.service';
import { id } from '@swimlane/ngx-charts/release/utils';
import { IProject } from '../../@core/models/project';

@Component({
  styles: ['./project.component.scss',
  `
    right-possition{display: contents;}

  `],
  template: `
  <div class="row" >
    <div class="col-md-3" *ngIf="admin">
      <nb-action icon="fas fa-edit" (click)="onEdit()"></nb-action>
    </div>
    <div class="col-md-3" *ngIf="admin">
      <nb-action icon="fas fa-trash" (click)="onDelete()"></nb-action>
    </div>
    <div [ngClass]="{'col-md-3' : admin, 'container': !admin}">
      <nb-action icon="fas fa-eye" (click)="onView()"></nb-action>
    </div>
    <div class="switch col-md-9" *ngIf="!admin">
        <input type="checkbox" [checked]="belongs" (change)="changeValue()">
        <span class="slider"></span>
      </div>
  </div>
  `,
})
export class ProjectActionsComponent implements OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() refresh = new EventEmitter();

  admin = false;
  belongs = false;

  constructor(private userService: UserService,
    private projectService: ProjectService) {}

  ngOnInit() {
    const roleName = this.userService.getDecodedAccessToken().roleName;
    if (roleName === 'Admin') {
        this.admin = true;
      }
    this.belongs = this.belongsToUser();
  }

  onEdit() {
    this.edit.emit(this.rowData);
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }

  onView() {
    this.view.emit(this.rowData);
  }

  belongsToUser() {
    const userId: string = this.userService.getDecodedAccessToken().id;
    const user: User = this.rowData.users.find(x => x.id === userId);
    return user ? true : false;
  }

  changeValue() {
    const userId: string = this.userService.getDecodedAccessToken().id;
    console.log(userId);
    let project: IProject = new IProject(this.rowData);
    if(this.belongs) {
      const index = project.users.indexOf(userId);
      project.users.splice(index, 1);
    } else {
      project.users.push(userId);
    }
    this.projectService.updateProject(project).subscribe( success => {
      this.refresh.emit();
    });
  }


}
