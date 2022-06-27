export class ServerException {
    message: string;
    statusCode: number;
    body: any;
    constructor(message: string, statusCode: number, body: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.body = body;
    }
}