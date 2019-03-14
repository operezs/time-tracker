import { User } from './user';
import { Task, ITask } from './task';

export class Report {
    id: string;
    date: Date;
    tasks: Task[];
    user: User;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: User, date?: Date, updatedAt?: Date, createdAt?: Date  ) {
        this.user = user;
        this.date = date;
        this.tasks = [];
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export class IReport {
    id: string;
    date: Date;
    tasks: ITask[];
    user: String;

    constructor(report: Report) {
        this.id = report.id;
        this.user = report.user.id;
        this.date = report.date;
        this.tasks = [];
        report.tasks.forEach((task: Task) => {
            this.tasks.push(new ITask(task));
        });
    }
}
/*
export class ReportListItem {
    id: string;
    date: Date;
    user: User;
    project: Project;    
    time: number;

    constructor(id: string, date: Date, user: User, project: Project, time: number) {
        this.id = id;
        this.date = date;
        this.user = user;
        this.project = project;
        this.time = time;
    }
}*/