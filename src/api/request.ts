/** @format */

// import customToast, { ToastType } from "@/components/Toast";
import axios, { type AxiosRequestConfig } from "axios";
import { logoutUser } from "./auth";


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

// const convertToFormData = (data: any) => {
//   const form_data = new FormData();
//   for (const key in data) {
//     form_data.append(key, data[key]);
//   }
//   return form_data;
// };

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

  // customToast(error?.response?.data?.message, ToastType.error);
  return Promise.reject(error?.response?.data?.message);
};

Request?.interceptors?.response?.use(
  async (response) => {
    return response.data.data;
  },
  async (error) => {
    await handleError(error);
  },
);

export { Request };
