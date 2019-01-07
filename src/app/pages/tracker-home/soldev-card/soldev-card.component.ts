import { Component, Output, Input } from '@angular/core';

@Component({
  selector: 'ngx-soldev-card',
  styleUrls: ['./soldev-card.component.scss'],
  templateUrl: './soldev-card.component.html',
})
export class SoldevCardComponent {

  flipped = false;
  @Input() userAdmin: boolean;
  @Input() userid: string;

  toggleFlipView() {
    this.flipped = !this.flipped;
  }
}
