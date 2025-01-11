import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { store } from "@store/index";
import customToast, { ToastType } from "@/components/Toast";
import { UserData } from "./auth";
import { EDIT_USER } from "@/store/reducers/types";

const dispatch = store.dispatch;

export const useUpdateUser = () =>
  useMutation({
    mutationFn: (values: UserData) =>
      Request.put(`/user/update-user`, values),
    onSuccess: async (data: any) => {
      customToast("User updated successfully", ToastType.success);
      dispatch({
        type: EDIT_USER,
        payload: data,
      });
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (values: { old_password: string, new_password: string }) =>
      Request.put(`/user/change-password`, values),
    onSuccess: async (data: any) => {
      customToast("Password changed successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });
