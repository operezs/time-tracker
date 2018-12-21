import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from './../../../@core/models/project';

import { ProjectInfoComponent } from './../../projects/project-info/project-info.component';
import { UserActivityService, UserActive } from '../../../@core/data/user-activity.service';

@Component({
  selector: 'ngx-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnDestroy, OnInit {

  private alive = true;

  @Input() projects: Project[];
  @Input() userMonthWork = new Map();
  // @Input() spentTimeUser: number[];

  percent: number;

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;
  rangeDate: any;
  

  constructor(private themeService: NbThemeService,
              private modalService: NgbModal) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  ngOnInit() {
    
  }


  progresPercent(spentTime: number, estimatedDuration: number) {
    return spentTime * 100 / estimatedDuration;
  }

  projectInfo(project: Project) {
    const modal: NgbModalRef = this.modalService.open(ProjectInfoComponent, { size: 'lg', container: 'nb-layout' });
    (<ProjectInfoComponent>modal.componentInstance).project = project;
  }

  cleanRangeDate() {
    this.rangeDate = '';
   }

  ngOnDestroy() {
    this.alive = false;
  }
}

