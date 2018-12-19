import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NbDateService } from '@nebular/theme';

import { ExpensesActionsComponent } from '../expenses-actions.component';
import { AddExpensesComponent } from '../add-expenses/add-expenses.component';
import { ExpensesInfoComponent } from './../expenses-info/expenses-info.component';

import { ReportService } from '../../../@core/data/report.service';
import { Report } from '../../../@core/models/report';
import { Response } from '../../../@core/models/response';
import { ProjectService } from '../../../@core/data/project.service';
import { Project } from '../../../@core/models/project';
import { UserService } from '../../../@core/data/users.service';
import { User } from '../../../@core/models/user';
import { ExpensesService } from '../../../@core/data/expenses.service';

@Component({
  selector: 'ngx-expenses-list',
  templateUrl: './expenses-list.component.html',
  styles: ['./add-expenses.component.scss',
  `
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ExpensesListComponent implements OnInit {
  timeLoged = 0;
  filters =  false;
  status = 'Show';
  admin = false;
  user: User;
  
  @Input() userInfoView: User;
  @Input() userInfo: boolean;

    // Date Piker
    min: Date;
    max: Date;
    rangeDate: any;

  userAssignedItems = [];
  dropdownUserList = [];

  dropdownUserSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'firstName',
   // selectAllText: 'Select All',
   //  unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true,
  };

  settings = {
    hideSubHeader: true,
    actions: false,
    noDataMessage: "There are no data related to your request ...",

    columns: {
      date: {
        title: 'Date',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let date = this.formatDate(value);
          return  date;
        }
      },
/*       users: {
        title: 'Developer Name',
        type: 'string',
        filter: true,
        valuePrepareFunction: (value) => {
          let name = `${value.firstName}`;
          return name;
        }
      }, */
      userName: {
        title: 'Developer Name',
        type: 'string',
        filter: true,
      },
      
      officeRent: {
        title: 'Office Rent',
        type: 'number',
        filter: true,
      },
      internetHours: {
        title: 'Internet Hours',
        type: 'number',
        filter: true,
      },
      othersExpense: {
        title: ' Others Expenses',
        type: 'number',
        filter: true,
      },
      id: {
        title: 'Actions',
        type: 'custom',
        filter: false,
        renderComponent: ExpensesActionsComponent,
        onComponentInitFunction: (instance) => {
          instance.edit.subscribe(expense => {
            this.editExpense(expense);
          });
          instance.delete.subscribe(expense => {
            if (window.confirm('Are you sure you want to delete?')) {
              this.expenseService.deleteExpense(expense.userName).subscribe( data => {
                this.dataFilter();
              });
            }
          });
          instance.view.subscribe(expense=> {
            this.onView(expense);
          });
        },
        width: '10%',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  @Output() expenseSelected = new EventEmitter();

  constructor(private expenseService: ExpensesService,
              private modalService: NgbModal,
              private userService: UserService,
              protected dateService: NbDateService<Date>) {
      this.min = this.dateService.addDay(this.dateService.today(), -5);
      this.max = this.dateService.addDay(this.dateService.today(), 5);
    }

  openAddExpensesModal() {
    const modal: NgbModalRef = this.modalService.open(AddExpensesComponent, { size: 'sm', container: 'nb-layout' });
    (<AddExpensesComponent>modal.componentInstance).titleForm = 'New Expense';
    (<AddExpensesComponent>modal.componentInstance).user = this.user;
    (<AddExpensesComponent>modal.componentInstance).save.subscribe(data => {
      this.dataFilter();
    });
  }

  editExpenses(expense) {
    const modal: NgbModalRef = this.modalService.open(AddExpensesComponent, { size: 'sm', container: 'nb-layout' });
    (<AddExpensesComponent>modal.componentInstance).expense = expense;
    (<AddExpensesComponent>modal.componentInstance).titleForm = 'Edit Expense';
    (<AddExpensesComponent>modal.componentInstance).user = this.user;
    (<AddExpensesComponent>modal.componentInstance).save.subscribe(data => {
      this.dataFilter();
    });
  }

  onView(expense): void {
    const modal: NgbModalRef = this.modalService.open(ExpensesInfoComponent, { size: 'sm', container: 'nb-layout' });
    (<ExpensesInfoComponent>modal.componentInstance).expense = expense;
  }

  ngOnInit() {
    this.getData();    
  }

  getData() {
    if (!this.userInfo) {
        const userId = this.userService.getDecodedAccessToken().id;
            this.userService.getUser(userId).subscribe((user: Response<User>) => {
              this.user = user.data;
              this.userService.getUsers().subscribe((users: Response<User[]>) => {
                this.dropdownUserList = users.data; 
                }); 
            });  
        }
    else {
      this.user = this.userInfoView;
    }  
    this.dataFilter();
  }

  dataFilter() {
    let userId = '';
    let startDate: Date = null;
    let endDate: Date = null;

   
    if (this.userAssignedItems.length !== 0)        
        userId = this.userAssignedItems[0].id;
     
    if (this.rangeDate) {
      startDate = this.rangeDate.start;
      endDate = this.rangeDate.end; 
    }
    if (!this.userInfo)
           this.getTableData(startDate, endDate, userId);
        else
           this.getTableData(startDate, endDate, this.user.id);
    }

  getTableData(startDate?: Date, endDate?: Date, userId?: string) {
    this.expenseService.getExpenses(startDate, endDate, userId)
                .subscribe((reports: Response<Report[]>) => {
      this.source.load(reports.data);
      this.calcTotalTime(reports.data);  
    });
  }

  calcTotalTime(reports: Report[]) {
    this.timeLoged = 0;
    for (let report of reports) {
        this.timeLoged = this.timeLoged + report.time;
    }
  }

  formatDate(date:string): string {
    return `${date.substring(8,10)}/${date.substring(5,7)}/${date.substring(0,4)}`;
  }

  cleanRangeDate() {
   this.rangeDate = '';
  }

    // projectMultiSelect
    onProjectSelect(item: any) {
    }
  
    // userMultiSelect
    onUserSelect(item: any) {
    }

}

