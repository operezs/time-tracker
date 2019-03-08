import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../@core/models/task';

@Component({
  selector: 'ngx-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  initials: string;
  @Input() task: Task;

  constructor() { }

  ngOnInit() {
    this.initials = '';
    const names: string[] = this.task.project.projectName.split(' ');
    names.forEach(name => {
      this.initials += name.charAt(0).toUpperCase();
    });
  }

}
