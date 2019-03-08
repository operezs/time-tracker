import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

import { Report } from '../../../@core/models/report';
import { ReportService } from '../../../@core/data/report.service';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { ApiResponse } from '../../../@core/models/response';
import { User } from '../../../@core/models/user';
import { Task } from '../../../@core/models/task';



@Component({
  selector: 'ngx-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss'],
})
export class AddReportComponent implements OnInit {

  report: Report;
  user: User;
  projects: Project[];
  project: Project;
  titleForm: string;

  selectedProjects = [];
  dropdownList = [];

  dropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'projectName',
    // selectAllText: 'Select All',
    //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  // Date Piker
  min: Date;
  max: Date;
  reportDate: Date;

  newTask: Task;

  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
    private reportService: ReportService,
    protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
  }

  ngOnInit() {
    this.getItemsDropdown();
    if (!this.report) {
      this.report = new Report(this.user, new Date());
    }
    if (!this.newTask) {
      this.newTask = new Task();
    }
    // if (this.report.id) {
    //     this.userName = this.report.user.firstName;
    // } else {
    //     this.userName = this.user.firstName;
    // }
  }

  closeModal() {
    this.activeModal.close();
  }

  getItemsDropdown() {
    this.dropdownList = this.projects;
    // if (this.projects)
    //    this.projectAssignedItems = [this.projects];
  }

  // reportAssignedMultiSelect() {
  //       this.projects = this.selectedProjects[0].id;
  // }

  onSubmit() {
    // this.reportAssignedMultiSelect();
    this.report.date = this.reportDate;
    console.log(this.selectedProjects[0]);
    if (this.report.id) {
      // this.projectAssignedItems[0].id = this.report.user.id;
      // this.report.user = this.selectedProjects[0].id;
      this.reportService.updateReport(this.report).subscribe(data => {
        this.closeModal();
        this.onSave();
      });
    } else {
      // this.projectAssignedItems[0].id = this.user.id;
      // this.report.user = this.selectedProjects[0].id;
      this.reportService.createReport(this.report).subscribe(data => {
        this.closeModal();
        this.onSave();
      });
    }
  }

  addTask() {
    const task: Task = new Task(this.project, this.newTask.time, this.newTask.description);
    this.report.tasks.push(task);
    this.newTask = new Task();
  }

  deleteTask(index: number) {
    this.report.tasks.splice(index, 1);
  }

  onSave() {
    this.save.emit();
  }

  // projectMultiSelect
  onItemSelect(item: any) {
    // this.roleAssignedItems.push(item);
    this.project = this.projects.find(project => project.id == item.id);
  }

  onSelectAll(item: any) {
    //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

  // userMultiSelect
  onItemSelectUser(item: any) {
    // this.roleAssignedItems.push(item);
  }
  onSelectAllUser(item: any) {
    //  this.multiDropdown.pushSelectedItems(this.dropdownList);
  }

}
