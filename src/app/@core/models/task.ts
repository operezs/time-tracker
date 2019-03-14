import { Project } from './project';
export class Task {
    id: string;
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

export class ITask {
    id: string;
    project: string;
    time: number;
    description: string;

    constructor(task: Task) {
        this.id = task.id
        this.project = task.project.id;
        this.time = task.time;
        this.description = task.description;
    }
}
