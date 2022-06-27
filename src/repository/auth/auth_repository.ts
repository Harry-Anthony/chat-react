import { RemoteSource } from "../../data/remote_source";
import { IAuthRepository } from "../../interface/repository/auth/auth_repository";

export class AuthRepository implements IAuthRepository {
    remoteSource: RemoteSource;
    constructor(data: any) {
        this.remoteSource = data;
    };
    async login(name: string, password: string) {
        const data = await this.remoteSource.login(name, password);
        return data;
    }
}