import internal from "stream";

export interface Failure {

};

export class ServerFailure implements Failure {
    message: string;
    body: string;
    statusCode: number;
    constructor(message: string, body: string, statusCode: number) {
        this.message = message;
        this.body = body;
        this.statusCode = statusCode;
    }
};

export class TokenFailure implements Failure {}
export class TokenExpiredFailure implements Failure {}
