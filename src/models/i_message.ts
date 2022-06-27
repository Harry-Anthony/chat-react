import { User } from "./i_user";

export interface Message {
    _id: string;
    userSender: User;
    userReceiver: User;
    content: string;
    type: string;
    __v: number;
}