import { AxiosResponse } from "axios";

export interface RemoteSource {
    login(name: string, password: string): any;
    searchUser(keyWord: string): any;
}