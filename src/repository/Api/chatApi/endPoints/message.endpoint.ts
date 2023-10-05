import { ChatApiEndpointBuilder } from "../chatApi";

export interface ListMessage {
  allMessage: AllMessage[];
  _id: string;
  count: number;
}

export interface AllMessage {
  _id: string;
  userSender: User;
  userReceiver: User;
  content: string;
  type: string;
  __v: number;
}

export interface User {
  _id: string;
  mail: string;
  name: string;
  avatar?: string;
  __v: number;
}
export interface LastMessageBody {
  firstId: string;
  secondId: string;
  lastIndex: string;
}
export const createMessageEndpoint = (builder: ChatApiEndpointBuilder) => ({
  getLastMessage: builder.query<ListMessage, LastMessageBody>({
    query: (body) => ({
      url: "/message/discussion",
      method: "POST",
      body,
    }),
  }),
});
