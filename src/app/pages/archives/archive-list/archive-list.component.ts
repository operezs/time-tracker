import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../@core/models/user';
import { Archive } from '../../../@core/models/archive';
import { ArchiveService } from '../../../@core/data/archive.service';
import { UserService } from '../../../@core/data/users.service';
import { ApiResponse } from '../../../@core/models/response';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceComponent } from '../invoice/invoice.component';
import { Invoice } from '../../../@core/models/invoice';
import { InvoiceService } from '../../../@core/data/invoice.service';

@Component({
    selector: 'ngx-archive-list',
    templateUrl: './archive-list.component.html',
    styleUrls: ['./archive-list.component.scss']
})
export class ArchiveListComponent implements OnInit {

    @Output() back = new EventEmitter();
    @Input() user: User;
    archives: Archive[];
    roleName: string;
    selectedOption: string;
    selectedMonth: number;
    selectedYear: number;
    spinner = false;

    constructor(private archiveService: ArchiveService,
        private userService: UserService,
        private invoiceService: InvoiceService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.roleName = this.userService.getDecodedAccessToken().roleName;
        let userId: string = this.userService.getDecodedAccessToken().id;
        if (this.roleName != 'Admin') {
            this.userService.getUser(userId).subscribe((user: ApiResponse<User>) => {
                this.user = user.data;
            });
        } else {
            userId = this.user.id;
        }
        this.spinner = true;
        this.archiveService.getArchives(userId).subscribe((archives: ApiResponse<Archive[]>) => {
            this.archives = archives.data;
            this.spinner = false;
        },
        error => {            
            this.spinner = false;
            alert(error);
        });

    }

    showReport(year: number, month: number) {
        this.selectedOption = "report";
        this.selectedYear = year;
        this.selectedMonth = month;
    }

    showInvoice(year: number, month: number) {
        // this.selectedOption = "invoice";
        this.spinner = true;
        this.selectedYear = year;
        this.selectedMonth = month;
        this.invoiceService.getInvoice(this.user.id, this.selectedMonth, this.selectedYear).subscribe((invoice: ApiResponse<Invoice>) => {
            const modal: NgbModalRef = this.modalService.open(InvoiceComponent, { size: 'sm', container: 'nb-layout' });
            (<InvoiceComponent>modal.componentInstance).user = this.user;
            (<InvoiceComponent>modal.componentInstance).month = this.selectedMonth;
            (<InvoiceComponent>modal.componentInstance).year = this.selectedYear;
            (<InvoiceComponent>modal.componentInstance).invoice = invoice.data;
            this.spinner = false;
        })
    }

    unselectOption() {
        this.selectedOption = '';
    }

    goBack() {
        if (this.selectedOption) {
            this.selectedOption = null;
        } else {
            this.back.emit();
        }
    }

}
