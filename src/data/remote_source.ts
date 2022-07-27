import { AxiosResponse } from "axios";

export interface RemoteSource {
    login(mail: string, password: string): any;
    searchUser(keyWord: string): any;
    register(name:string, mail: string, password: string): any;
}