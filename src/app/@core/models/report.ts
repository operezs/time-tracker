import { User } from './user';
import { Project } from './project';
import { Task } from './task';
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

    getTime() {
        let totalTime: number = 0;
        this.tasks.forEach(task => {
            totalTime += task.time;
        });
        return totalTime;
    }
}
