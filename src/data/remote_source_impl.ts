import { RemoteSource } from "./remote_source";
import axios from 'axios';
import { RemoteConfig } from "./remote_config";

export class RemoteSourceImpl implements RemoteSource {

    async register(name: string, mail: string, password: string) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({ name, mail, password }),
        };
        let res = await axios(RemoteConfig.register, requestOptions);
        return res;
    }

    async searchUser(keyWord: string) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({ keyWord }),
        };
        let res = await axios(RemoteConfig.searchUser,requestOptions);
        return res;
    }

    async login(mail: string, password: string) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({ mail, password }),
        };
        let res = await axios(RemoteConfig.login,requestOptions);
        return res;
    }

}