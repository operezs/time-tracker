import { Component, Input } from '@angular/core';
import { User } from './../../../../@core/models/user';
import { ProfitBarAnimationChartService } from '../../../../@core/data/profit-bar-animation-chart.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-user-card-front',
  styleUrls: ['./user-card-front.component.scss'],
  templateUrl: './user-card-front.component.html',
})
export class UserCardFrontComponent {

  @Input() user: User;
  
  username: string = '';
  
  constructor() { }

  ngOnInit() {
  }

}

