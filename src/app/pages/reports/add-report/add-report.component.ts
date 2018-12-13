import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

import { Report } from '../../../@core/models/report';
import { ReportService } from '../../../@core/data/report.service';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { Response } from '../../../@core/models/response';
import { User } from '../../../@core/models/user';



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
  userAssigned: {id, userName};

  projectAssignedItems = [];
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

  userName: string;

  @Output() save = new EventEmitter();

  constructor(private activeModal: NgbActiveModal,
              private reportService: ReportService,
              private projectService: ProjectService,
              protected dateService: NbDateService<Date>) {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);            
    if (!this.report) {
      this.report = new Report( this.project , this.user, '');
    }
  }

  ngOnInit() {
    this.getItemsDropdown();
    if (this.report.id) {
        this.userName = this.report.users.firstName;
    } else {
        this.userName = this.user.firstName;
    }
  }

  closeModal() {    
    this.activeModal.close();
  }

  getItemsDropdown() {
    this.dropdownList = this.projects;
    if (this.report.projects)
       this.projectAssignedItems = [this.report.projects];
  }

  reportAssignedMultiSelect() {
    if (this.projectAssignedItems.length !== 0) {
        this.report.projects = this.projectAssignedItems[0].id;
    }
    this.projectAssignedItems[0].id = this.user.id;
    this.report.users = this.projectAssignedItems[0].id;
  }

  onSubmit() {
    this.reportAssignedMultiSelect();
    this.report.date = this.reportDate;
    if (this.report.id) {
        this.reportService.updateReport(this.report).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    } else {
        this.reportService.createReport(this.report).subscribe( data => {
        this.closeModal();
        this.onSave();
      });
    }
  }


  onSave() {
    this.save.emit();
  }

  // projectMultiSelect
  onItemSelect(item: any) {
    // this.roleAssignedItems.push(item);
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
