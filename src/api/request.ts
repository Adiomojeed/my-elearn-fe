/** @format */

// import customToast, { ToastType } from "@/components/Toast";
import axios, { type AxiosRequestConfig } from "axios";
import { logoutUser } from "./auth";
import customToast, { ToastType } from "@/components/Toast";


export const tokenConfig = {
  key: {
    token: "accessToken",
    role: "role",
  },
};

const Request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 30000,
});

const requestConfiguration = (config: AxiosRequestConfig) => {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem(tokenConfig.key.token);
  }
  if (token) {
    return {
      ...config,
      headers: {
        ...(token && { Authorization: token, }),
        ...config.headers,
      },
      data: config.data,
    };
  }

  return config;
};

// @ts-ignore
Request?.interceptors?.request?.use(requestConfiguration, (error) => {
  return Promise.reject(error);
});

const handleError = (error: any) => {
  if (Number(error.status) === 403) {
    logoutUser()
  }

  return Promise.reject(error?.response?.data?.message);
};

Request?.interceptors?.response?.use(
  async (response) => {
    const url = response.request.responseURL;
    if (url.includes("bulk")) {
      customToast(response.data.message, ToastType.success);
    }
    return response.data.data;
  },
  async (error) => {
    await handleError(error);
  },
);

export { Request };
