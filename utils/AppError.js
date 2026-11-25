export class AppError extends Error {
    constructor(message, status = 500, type = "Server Error") {
        super(message); // שליחה לאבא
        this.status = status;
        this.type = type;
    }
}