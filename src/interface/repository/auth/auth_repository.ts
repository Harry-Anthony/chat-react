export interface IAuthRepository {
    login(name: string, password: string): any;
}