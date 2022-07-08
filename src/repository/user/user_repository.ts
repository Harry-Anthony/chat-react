import { RemoteSource } from "../../data/remote_source";
import IUserRepository from "../../interface/repository/user/user_repository";

export class UserRepository implements IUserRepository {
    remoteSource: RemoteSource;
    constructor(data: any) {
        this.remoteSource = data;
    };
    async searchUser(keyWord: string) {
        const data = await this.remoteSource.searchUser(keyWord);
        return data;
    }

}