export interface IAuthRepository {
    login(mail: string, password: string): any;
    register(name: string,mail: string, password: string): any;
}