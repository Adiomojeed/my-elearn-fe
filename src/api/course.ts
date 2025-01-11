import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { store } from "@store/index";
import customToast, { ToastType } from "@/components/Toast";
import { UserData } from "./auth";
import { EDIT_USER } from "@/store/reducers/types";

const dispatch = store.dispatch;

export type CreateCourseData = {
  code: string,
  title: string,
  description: string
};

export type CourseData = CreateCourseData & {
  _id?: string,
  isActive?: boolean,
  educators?: { _id: string, firstname: string, lastname: string }[],
  students?: { _id: string }[],
  modules: {}[]
};

export const useUpdateUser = () =>
  useMutation({
    mutationFn: (values: UserData) =>
      Request.post(`/user/update-user`, values),
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

export const useGetCourses = (limit?: number) =>
  useQuery({
    queryKey: ["getCourses",],
    queryFn: () => {
      return Request.get(`/user/get-courses?limit=${limit}`).then(res => res)
    },
  });

export const useGetSingleCourse = (id: string) =>
  useQuery({
    queryKey: ["getSingleCourse",],
    queryFn: () => {
      return Request.get(`/courses/${id}`).then(res => res)
    },
  });
