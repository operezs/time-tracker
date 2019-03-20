import { User } from './user';
export class Project {
    id: string;
    projectName: string;
    estimatedDuration: number;
    currentSpentTime: number;
    users: User[];
    description: string;
    createAt: Date;
    updateAt: Date;

    constructor(projectName: string, estimatedDuration: number,
        description: string, spentTime: number = 0, users?: User[],
        updateAt?: Date, createAt?: Date) {
        this.projectName = projectName;
        this.estimatedDuration = estimatedDuration;
        this.currentSpentTime = spentTime;
        this.users = users ? users : [];
        this.description = description;
        this.createAt = createAt;
        this.updateAt = updateAt;

    }
}

export class IProject {
    id: string;
    projectName: string;
    estimatedDuration: number;
    currentSpentTime: number;
    users: string[];
    description: string;

    constructor(project: Project) {
        this.id = project.id;
        this.projectName = project.projectName;
        this.estimatedDuration = project.estimatedDuration;
        this.currentSpentTime = project.currentSpentTime;
        this.users = [];
        if (project.users) {
            project.users.forEach(user => {
                this.users.push(user.id);
            });
        }
        this.description = project.description;

    }
}