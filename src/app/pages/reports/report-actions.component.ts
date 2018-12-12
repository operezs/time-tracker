import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  template: `
  <div class="row">
    <div class="col-md-3">
      <nb-action icon="fas fa-edit" (click)="onEdit()"></nb-action>
    </div>
    <div class="col-md-3">
      <nb-action icon="fas fa-trash" (click)="onDelete()"></nb-action>
    </div>
    <div class="col-md-3">
      <nb-action icon="fas fa-eye" (click)="onView()"></nb-action>
    </div>
  `,
})
export class ReportActionsComponent implements OnInit {
  @Input() value: any;    // This hold the cell value
  @Input() rowData: any;  // This holds the entire row object
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() view = new EventEmitter();


  constructor() {}

  ngOnInit() {}

  onEdit() {
    this.edit.emit(this.rowData);
  }

  onDelete() {
    this.delete.emit(this.rowData);
  }

  onView() {
    this.view.emit(this.rowData);
  }

}
