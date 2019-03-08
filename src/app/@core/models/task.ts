import { User } from './user';
import { Project } from './project';
export class Task {
    project: Project;
    time: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(project?: Project, time?: number, description?: string,
                updatedAt?: Date, createdAt?: Date  ) {
        this.project = project;
        this.time = time ? time : 0;
        this.description = description ? description : '';
        this.updatedAt = updatedAt ? updatedAt : new Date();
        this.createdAt = createdAt ? createdAt : new Date();
    }
}
