import { User } from './user';
import { Project } from './project';
export class Invoice {
    user: User;
    time: number;
    extra: number;
    internet: number;
    totalCUC: number;
    updatedAt: Date;
    createdAt: Date;

    constructor(user: User, time: number, extra: number, internet: number,
                updatedAt?: Date, createdAt?: Date  ) {
        this.user = user;
        this.time = time;
        this.extra = extra;
        this.internet = internet;
        this.totalCUC = user.salary ? user.salary : 0 / 180.00 * time + extra + internet;
        this.updatedAt = updatedAt ? updatedAt : new Date();
        this.createdAt = createdAt ? createdAt : new Date();        
    }
}
