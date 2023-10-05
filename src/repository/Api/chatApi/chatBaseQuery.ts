import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { URL } from "../../../utils/socket";

export const chatAxiosInstance = axios.create({
  baseURL: URL + "/chat-harivola",
  headers: {},
});

export const chatBaseQuery: BaseQueryFn<
  {
    url: string;
    baseUrl?: string;
    method?: AxiosRequestConfig["method"];
    body?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    apiVersion?: string;
    contentType?: string;
  },
  unknown,
  unknown,
  {}
> = async ({ url, method, body: data, params }) => {
  try {
    const result = await chatAxiosInstance({
      url,
      method,
      data,
      params,
    });

    return {
      data: result.data,
      error: undefined,
    };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
      data: undefined,
    };
  }
};
