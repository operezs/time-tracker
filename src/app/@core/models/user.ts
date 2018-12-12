import { Role } from './role';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
    // --quit
    isDeleted: number;
    createdAt: Date;
    updatedAt: Date;

    constructor( userName: string, lastName: string, email: string,
                password?: string, roleId?: string, updatedAt?: Date, createdAt?: Date ) {
        this.firstName = userName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roleId = roleId;
        this.isDeleted = 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

