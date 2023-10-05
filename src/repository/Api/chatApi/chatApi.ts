import { createApi } from "@reduxjs/toolkit/query/react";
import { chatBaseQuery } from "./chatBaseQuery";
import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { createMessageEndpoint } from "./endPoints/message.endpoint";
export type ChatApiEndpointBuilder = EndpointBuilder<
  typeof chatBaseQuery,
  never,
  "chatApi"
>;

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: chatBaseQuery,
  endpoints: (builder) => ({
    ...createMessageEndpoint(builder),
  }),
});

export const { useLazyGetLastMessageQuery } = chatApi;
