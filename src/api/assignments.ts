import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, } from "./request";
import { store } from "@store/index";
import customToast, { ToastType } from "@/components/Toast";
import { CourseData } from "./course";

// export const invalidateSingleCourse = (queryClient: any, onClose?: any,) => {
//   onClose && onClose();
//   queryClient.invalidateQueries({
//     queryKey: ["getSingleCourse"],
//   });
// };

const dispatch = store.dispatch;


export type AssignmentData = {
  title?: string;
  description?: string,
  isVisible?: boolean,
  dueDate?: Date | string,
  course?: CourseData | string,
  courseId?: string,
  _id?: string,
  createdAt?: Date,
  file?: { name: string, url: string }
}

export const useGetAssignments = ({ limit = 1000, courseId }: { limit?: number, courseId?: string }) =>
  useQuery({
    queryKey: ["getAssignments",],
    queryFn: () => {
      return Request.get(courseId ? `/assignments/courses/${courseId}?limit=${limit}` : `/assignments?limit=${limit}`).then(res => res)
    },
  });

export const useGetSingleAssignment = (assignmentId?: string) =>
  useQuery({
    queryKey: ["getSingleAssignment",],
    queryFn: () => {
      return Request.get(`assignments/${assignmentId}`).then(res => res)
    },
  });

export const useCreateAssignment = () =>
  useMutation({
    mutationFn: (values: AssignmentData) =>
      Request.post(`/assignments`, values),
    onSuccess: async (data: any) => {
      customToast("Assignment created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useUpdateAssignment = () =>
  useMutation({
    mutationFn: (values: { assignment: AssignmentData, assId: string }) =>
      Request.put(`/assignments/${values.assId}`, values.assignment),
    onSuccess: async (data: any) => {
      customToast("Assignment updated successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });