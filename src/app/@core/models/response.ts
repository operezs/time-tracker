
export class ApiResponse<T> {
    success: boolean;
    version: string;
    date: Date;
    data: T;
}
