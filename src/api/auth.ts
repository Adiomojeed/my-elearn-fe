import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { store } from "@store/index";
import { AUTH_USER } from "@store/reducers/types";
// import customToast, { ToastType } from "@components/Toast";
// import config from "./config";
import { createCookie, deleteCookie } from "./cookiesActions";
import customToast, { ToastType } from "@/components/Toast";

export type AuthData = {
  firstname?: string,
  lastname?: string,
  companyname?: string,
  phoneNo?: string,
  email: string,
  password: string
};

export type UserData = AuthData & {};

const dispatch = store.dispatch;


export const useLoginUser = () =>
  useMutation({
    mutationFn: (values: AuthData) =>
      Request.post(`/login`, values),
    onSuccess: async (data: any) => {
      localStorage.setItem(config.key.token, `Bearer ${data.token as string}`);
      createCookie(config.key.token, `Bearer ${data.token as string}`);

      dispatch({
        type: AUTH_USER,
        payload: data.user,
      });

      setTimeout(() => {
        customToast("User logged in successfully", ToastType.success);
        window.location.reload();
      }, 1000);
    },
    onError: (err) => {
      // customToast((err as any)?.title, ToastType.error);
    },
  });

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (values: AuthData) =>
      Request.post(`/signup`, values),
    onSuccess: async (data: any) => {
      localStorage.setItem(config.key.token, `Bearer ${data.token as string}`);
      createCookie(config.key.token, `Bearer ${data.tokenConfig as string}`);

      dispatch({
        type: AUTH_USER,
        payload: data.user,
      });
      customToast("User created successfully", ToastType.success);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (err) => {
      // customToast((err as any)?.title, ToastType.error);
    },
  });

export const logoutUser = () => {
  deleteCookie(config.key.token);

  localStorage.removeItem(config.key.token);
  // window.location.href = "/sign-in";
  // permanentRedirect("/sign-in");
  customToast("User logged out successfully", ToastType.success);
  setTimeout(() => {
    window.location.href = "/sign-in";

    // window.location.reload();
  }, 1000);
};