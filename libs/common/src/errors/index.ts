export class AppError {
    errCode: string;
    message: string;
    constructor(code: string, message: string) {
        this.errCode = code;
        this.message = message;
    }
}
