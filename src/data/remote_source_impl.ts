import { RemoteSource } from "./remote_source";
import axios from 'axios';
import { RemoteConfig } from "./remote_config";

export class RemoteSourceImpl implements RemoteSource {
    async login(name: string, password: string) {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({ name, password }),
        };
        let res = await axios(RemoteConfig.login,requestOptions);
        return res;
    }

}