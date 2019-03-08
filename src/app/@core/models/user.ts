import { Role } from './role';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    salary: number;
    internet: boolean;
    // --quit
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;

    constructor( userName: string, lastName: string, email: string,
                mobile?: string, salary?: number, internet?: boolean,
                password?: string, role?: string, updatedAt?: Date, createdAt?: Date ) {
        this.firstName = userName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.mobile = mobile;
        this.internet = internet;
        this.salary = salary;
        this.isDeleted = 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

