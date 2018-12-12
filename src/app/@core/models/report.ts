import { User } from './user';
import { Project } from './project';
export class Report {
    id: string;
    projects: Project;
    users: User;
    time: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    date: Date;

    constructor(projects: Project, users: User,  description: string,
                time?: number, date?: Date, updatedAt?: Date, createdAt?: Date  ) {
        this.projects = projects;
        this.users = users;
        this.time = time;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.date = date;
    }
}
