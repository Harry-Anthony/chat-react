import axios from "axios";
import { RemoteConfig } from "../../data/remote_config";

let sourceGetlastMessage = axios.CancelToken.source();

export class ChatRepository {
    getUserDiscussion = async (user: string) => {
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({ user }),
        };
        let res = await axios(RemoteConfig.message + '/chat', requestOptions);
        return res;
    }
    getLastMessage = async ({firstId, secondId, lastIndex}: {firstId: string, secondId: string, lastIndex: any}) => {
        let last = lastIndex != null ? lastIndex._id : null;
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify({firstId, secondId, lastIndex: last}),
            cancelToken: sourceGetlastMessage.token
        };
        let res = await axios(RemoteConfig.message + '/discussion', requestOptions,);
        return res;
    }
    static cancelGetLastMessage = () => {
        console.log("cancel http request")
        sourceGetlastMessage.cancel();
    }

}