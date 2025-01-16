import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { store } from "@store/index";
import { AUTH_USER, LOGOUT } from "@store/reducers/types";
// import customToast, { ToastType } from "@components/Toast";
// import config from "./config";
import { createCookie, deleteCookie } from "./cookiesActions";
import customToast, { ToastType } from "@/components/Toast";

export type AuthData = {
  account_id: string,
  password: string,
  role?: string
};

export type UserData = AuthData & {
  firstname: string,
  lastname: string,
  email: string,
  role: "student" | "educator" | "admin",
  isDefaultPassword?: boolean,
  courses: { _id: string, title: string }[],
  _id?: string,
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
      Request.post(`/auth/create-user`, values),
    onSuccess: async (data: any) => {
      customToast("New user created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (email: string) =>
      Request.post(`/auth/forgot-password`, { email }),
    onSuccess: async (data: any) => {
      customToast("Password reset mail sent successfully", ToastType.success);
      window.location.href = "/sign-in";
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useResetPassword = () =>
  useMutation({
    mutationFn: (values: { password: string, token: string }) =>
      Request.post(`/auth/reset-password`, values),
    onSuccess: async (data: any) => {
      customToast("Password changed successfully, you can now login", ToastType.success);
      window.location.href = "/sign-in";
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useCreateUser = () =>
  useMutation({
    mutationFn: (values: AuthData) =>
      Request.post(`/auth/create-user`, values),
    onSuccess: async (data: any) => {
      customToast("New user created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useCreateBulkUsers = () =>
  useMutation({
    mutationFn: (values: any) =>
      Request.post(`/auth/create-bulk-users`, values),
    onSuccess: async (data: any) => {
      // customToast("All users created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useAssignCoursesToUser = () =>
  useMutation({
    mutationFn: (values: { userId: string, courseIds: string[] }) =>
      Request.put(`/admin/users/assign-courses`, values),
    onSuccess: async (data: any) => {
      customToast("Courses assigned to user successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const logoutUser = () => {
  deleteCookie();
  dispatch({ type: LOGOUT })
  localStorage.removeItem(config.key.token);
  customToast("User logged out successfully", ToastType.success);
  setTimeout(() => {
    window.location.href = "/sign-in";
  }, 1000);
};