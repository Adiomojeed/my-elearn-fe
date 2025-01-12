import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, } from "./request";
import { store } from "@store/index";
import customToast, { ToastType } from "@/components/Toast";

// export const invalidateSingleCourse = (queryClient: any, onClose?: any,) => {
//   onClose && onClose();
//   queryClient.invalidateQueries({
//     queryKey: ["getSingleCourse"],
//   });
// };

const dispatch = store.dispatch;


export type AnnouncementData = {
  title?: string;
  content?: string,
  createdBy?: any,
  course?: string,
  _id?: string,
  createdAt?: string
}

export const useGetAnnouncements = (limit?: number) =>
  useQuery({
    queryKey: ["getAnnouncements",],
    queryFn: () => {
      return Request.get(`/announcements?limit=${limit ?? 1000}`).then(res => res)
    },
  });

export const useCreateAnnouncement = () =>
  useMutation({
    mutationFn: (values: { announcement: AnnouncementData, courseId: string }) =>
      Request.post(`/announcements/${values.courseId}`, values.announcement),
    onSuccess: async (data: any) => {
      customToast("Announcement created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useUpdateAnnouncement = () =>
  useMutation({
    mutationFn: (values: { announcement: AnnouncementData, annId: string }) =>
      Request.put(`/announcements/${values.annId}`, values.announcement),
    onSuccess: async (data: any) => {
      customToast("Announcement updated successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });