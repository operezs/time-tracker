
export class Role {
    id: number;
    roleName: string;
    workMode: string;
    basicSalary: number;
    extraHours: number;
    payExtraHours: number;
    description: string;
    // TODO:--quit
    createdAt: Date;
    updatedAt: Date;

    constructor(roleName: string, workMode: string, basicSalary: number,
                description: string, extraHours: number, payExtraHours?: number,
                updatedAt?: Date, createdAt?: Date ) {
        this.roleName = roleName;
        this.workMode = workMode;
        this.basicSalary = basicSalary;
        this.extraHours = extraHours;
        this.payExtraHours = payExtraHours;
        this.description = description;
        // TODO:--quit
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
