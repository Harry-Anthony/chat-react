import { RemoteSource } from "../../data/remote_source";
import { IAuthRepository } from "../../interface/repository/auth/auth_repository";

export class AuthRepository implements IAuthRepository {
    remoteSource: RemoteSource;
    constructor(data: any) {
        this.remoteSource = data;
    }
    async register(name: string, mail: string, password: string) {
        const data = await this.remoteSource.register(name, mail, password);
        return data;
    }
;
    async login(mail: string, password: string) {
        const data = await this.remoteSource.login(mail, password);
        return data;
    }
}