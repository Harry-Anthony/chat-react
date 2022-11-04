let baseUrl = 'https://chat-api-001.herokuapp.com/chat-harivola/';
export class RemoteConfig {
    static login = baseUrl + 'auth/login';
    static register = baseUrl + 'auth/register';
    static searchUser = baseUrl + 'user/searchUser';
    static message = baseUrl + 'message';
}