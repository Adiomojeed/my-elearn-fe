import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
import { CreateCourseData } from "./course";
import customToast, { ToastType } from "@/components/Toast";


export const useGetUsers = ({ page, limit }: { page: number, limit: number }) =>
  useQuery({
    queryKey: ["getUsers",],
    queryFn: () => {
      return Request.get(`/admin/users?page=${page}&limit=${limit}`).then(res => res)
    },
  });

export const useGetCourses = ({ page, limit }: { page: number, limit: number }) =>
  useQuery({
    queryKey: ["getCourses",],
    queryFn: () => {
      return Request.get(`/admin/courses?page=${page}&limit=${limit}`).then(res => res)
    },
  });

export const useCreateCourse = () =>
  useMutation({
    mutationFn: (values: CreateCourseData) =>
      Request.post(`/admin/create-course`, values),
    onSuccess: async (data: any) => {
      customToast("Course created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

// export const useCalculateVolume = () => {
//   return useMutation({
//     mutationFn: (values: {
//       container_type: string,
//       diameter: number,
//       height?: number,
//       tank_head?: string
//     }) =>
//       Request.post(`/volumes`, values),
//     onSuccess: async (data: any) => {
//       // console.log(data)
//     }
//   })
// };

// export const useSaveTank = () => {
//   return useMutation({
//     mutationFn: (values: {
//       name: string,
//       number: string,
//       location: string,
//       company: string,
//       volume: number
//     }) =>
//       Request.post(`/tanks`, values),
//     onSuccess: async (data: any) => {
//       // console.log(data)
//     }
//   })
// };