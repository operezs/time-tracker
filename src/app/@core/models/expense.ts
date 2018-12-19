import { User } from './user';

export class Expense {
    id: string;
    // user: User;
    userName: string;
    officeRent: number;
    internetHours: number;
    internetRate: number;
    description: string;
    othersExpense: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;

    constructor(userName: string,  officeRent?: number, internetHours?: number, 
                internetRate: number = 2, description?: string, othersExpense?: number, 
                date?: Date, updatedAt?: Date, createdAt?: Date  ) {
                    
        this.userName = userName;
        this.officeRent = officeRent;
        this.internetHours = internetHours;
        this.internetRate = internetRate;
        this.description = description;
        this.othersExpense = othersExpense;
        this.date = date;
    }
}
