import { Component, OnDestroy } from '@angular/core';
import { EarningService, PieChart } from '../../../../@core/data/earning.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-soldev-card-back',
  styleUrls: ['./soldev-card-back.component.scss'],
  templateUrl: './soldev-card-back.component.html',
})
export class SoldevCardBackComponent implements OnDestroy {
  private alive = true;

  earningPieChartData: PieChart[];
  name: string;
  color: string;
  value: number;
  defaultSelectedCurrency: string = 'Bitcoin';

  constructor(private earningService: EarningService ) {
    this.earningService.getEarningPieChartData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((earningPieChartData) => {
        this.earningPieChartData = earningPieChartData;
      });
  }

  changeChartInfo(pieData: {value: number; name: string; color: any}) {
    this.value = pieData.value;
    this.name = pieData.name;
    this.color = pieData.color;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
