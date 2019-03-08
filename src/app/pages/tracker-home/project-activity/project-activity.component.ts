import { UserService } from './../../../@core/data/users.service';
import { ApiResponse } from './../../../@core/models/response';
import { ProjectService } from './../../../@core/data/project.service';
import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ProjectInfoComponent } from './../../projects/project-info/project-info.component';
import { Project } from './../../../@core/models/project';


@Component({
  selector: 'ngx-project-activity',
  styleUrls: ['./project-activity.component.scss'],
  templateUrl: './project-activity.component.html',
})
export class TrackerHomeProjectActivityComponent implements OnDestroy {

  private alive = true;
  countProject = false;
  @Input() projects: Project[];
  @Input() userMonthWork = new Map();
  @Input() userAdmin: boolean;

  size: string = 'small';

  currentTheme: string;

  constructor(private themeService: NbThemeService, 
              private modalService: NgbModal,
              private projectService: ProjectService,
              private userService: UserService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    this.getCardSize();
  }

  getCardSize() {
    const roleName = this.userService.getDecodedAccessToken().roleName;
    const userid = this.userService.getDecodedAccessToken().id;
    if (roleName === 'Admin') {
      this.projectService.getProjects().subscribe((projects: ApiResponse<Project[]>) => {
        if (projects.data.length >= 5) {
          this.countProject = true;
         }
        });
    } else {
      this.projectService.getProjectsUser(userid).subscribe((projects: ApiResponse<Project[]>) => {
       if (projects.data.length >= 5) {
          this.countProject = true;
        }
       });
    }
  }

  progresPercent(spentTime: number, estimatedDuration: number) {
    return spentTime * 100 / estimatedDuration;
  }

  projectInfo(project: Project) {
    const modal: NgbModalRef = this.modalService.open(ProjectInfoComponent, { size: 'lg', container: 'nb-layout' });
    (<ProjectInfoComponent>modal.componentInstance).project = project;
  }

  cleanRangeDate() {
   }

  ngOnDestroy() {
    this.alive = false;
  }
}
