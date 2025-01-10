import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { store } from "@store/index";
import { AUTH_USER } from "@store/reducers/types";
// import customToast, { ToastType } from "@components/Toast";
// import config from "./config";
import { createCookie, deleteCookie } from "./cookiesActions";
import customToast, { ToastType } from "@/components/Toast";

export type AuthData = {
  account_id: string,
  password: string,
};

export type UserData = AuthData & {
  firstname: string,
  lastname: string,
  email: string,
  role: "student" | "educator" | "admin",
  isDefaultPassword?: boolean,
  courses: {}[],
  _id?: string
};

const dispatch = store.dispatch;


export const useLoginUser = () =>
  useMutation({
    // @ts-ignore
    mutationFn: (values: AuthData) =>
      Request.post(`/auth/login`, values),
    onSuccess: async (data: { user: UserData, token: string }) => {
      localStorage.setItem(config.key.token, `Bearer ${data.token as string}`);
      createCookie(config.key.token, `Bearer ${data.token as string}`);
      createCookie(config.key.role, data.user.role)

      dispatch({
        type: AUTH_USER,
        payload: data.user,
      });

      setTimeout(() => {
        customToast("User logged in successfully", ToastType.success);
        window.location.reload();
      }, 1000);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (values: AuthData) =>
      Request.post(`/auth/createUser`, values),
    onSuccess: async (data: any) => {
      customToast("New user created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: (values: AuthData) =>
      Request.post(`/auth/createUser`, values),
    onSuccess: async (data: any) => {
      customToast("New user created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const logoutUser = () => {
  deleteCookie(config.key.token);
  deleteCookie(config.key.role);

  localStorage.removeItem(config.key.token);
  // window.location.href = "/sign-in";
  // permanentRedirect("/sign-in");
  customToast("User logged out successfully", ToastType.success);
  setTimeout(() => {
    window.location.href = "/sign-in";

    // window.location.reload();
  }, 1000);
};