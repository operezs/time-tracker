import { User } from './user';
export class Invoice {
    id: string;
    user: User;
    salary: number;
    time: number;
    extra: number;
    internet: number;
    totalCUC: number;
    month: number;
    year: number;
    updatedAt: Date;
    createdAt: Date;

    constructor(user: User, time: number, extra: number, internet: number,
                month: number, year: number, updatedAt?: Date, createdAt?: Date) {
        this.user = user;
        this.salary = user.salary;
        this.time = time;
        this.extra = extra;
        this.internet = internet;
        this.totalCUC = user.salary / 180.00 * time + extra + internet;
        this.month = month;
        this.year = year;
        this.updatedAt = updatedAt ? updatedAt : new Date();
        this.createdAt = createdAt ? createdAt : new Date();
    }
}

export class IInvoice {
    id: string;
    user: string;
    salary: number;
    time: number;
    extra: number;
    internet: number;
    totalCUC: number;
    month: number;
    year: number;

    constructor(invoice: Invoice) {
        this.user = invoice.user.id;
        this.salary = invoice.user.salary;
        this.time = invoice.time;
        this.extra = invoice.extra;
        this.internet = invoice.internet;
        this.totalCUC = this.salary / 180.00 * this.time + this.extra + this.internet;
        this.month = invoice.month;
        this.year = invoice.year;
    }
}

