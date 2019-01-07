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

  @Input() projects: Project[];
  @Input() userMonthWork = new Map();
  @Input() userAdmin: boolean;

  size: string = 'small';

  currentTheme: string;

  constructor(private themeService: NbThemeService, 
              private modalService: NgbModal) {
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
    let count = 0;
    for (let project of this.projects) {
       console.log(count);
       count ++;
    }
    if (count >= 5 ) {
      console.log('entro');
      this.size = 'medium';
    } else {
      this.size = '';
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
