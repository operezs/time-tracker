import { User } from './user';
export class Archive {
    user: User;
    year: number;
    months: number[];
}

export class Month {
    month: number;
    year: number;
}