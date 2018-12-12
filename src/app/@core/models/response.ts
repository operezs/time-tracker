
export class Response<T> {
    success: boolean;
    version: string;
    date: Date;
    data: T;
}
