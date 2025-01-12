import { useMutation, useQuery } from "@tanstack/react-query";
import { Request } from "./request";
import { store } from "@store/index";
import customToast, { ToastType } from "@/components/Toast";


export const invalidateSingleCourse = (queryClient: any, onClose?: any,) => {
  onClose && onClose();
  queryClient.invalidateQueries({
    queryKey: ["getSingleCourse"],
  });
};

const dispatch = store.dispatch;

export type CreateCourseData = {
  code: string,
  title: string,
  description: string
};

export type LessonData = {
  _id?: string;
  title?: string,
  isVisible?: boolean,
  file?: { name: string, url: string }
}

export type ModuleData = {
  _id?: string;
  title?: string,
  isVisible?: boolean,
  lessons?: LessonData[]
}

export type CourseData = CreateCourseData & {
  _id?: string,
  isActive?: boolean,
  educators?: { _id: string, firstname: string, lastname: string }[],
  students?: { _id: string }[],
  modules: ModuleData[]
  lessonCount?: number
};

export const useUpdateCourse = () =>
  useMutation({
    mutationFn: (values: { course: CourseData, courseId: string }) =>
      Request.put(`/courses/${values.courseId}`, values.course),
    onSuccess: async (data: any) => {
      customToast("Course updated successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });


export const useGetCourses = (limit?: number) =>
  useQuery({
    queryKey: ["getCourses",],
    queryFn: () => {
      return Request.get(`/user/get-courses?limit=${limit ?? 1000}`).then(res => res)
    },
  });

export const useGetSingleCourse = (id: string) =>
  useQuery({
    queryKey: ["getSingleCourse",],
    queryFn: () => {
      return Request.get(`/courses/${id}`).then(res => res)
    },
  });

export const useCreateModule = () =>
  useMutation({
    mutationFn: (values: { module: ModuleData, courseId: string }) =>
      Request.post(`/courses/${values.courseId}/modules`, values.module),
    onSuccess: async (data: any) => {
      customToast("Module created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useEditModule = () =>
  useMutation({
    mutationFn: (values: { module: ModuleData, courseId: string, moduleId: string }) =>
      Request.put(`/courses/${values.courseId}/modules/${values.moduleId}`, values.module),
    onSuccess: async (data: any) => {
      customToast("Module updated successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useDeleteModule = () =>
  useMutation({
    mutationFn: (values: { courseId: string, moduleId: string }) =>
      Request.delete(`/courses/${values.courseId}/modules/${values.moduleId}`),
    onSuccess: async (data: any) => {
      customToast("Module deleted successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useCreateLesson = () =>
  useMutation({
    mutationFn: (values: { lesson: LessonData, courseId: string, moduleId: string }) =>
      Request.post(`/courses/${values.courseId}/modules/${values.moduleId}/lessons`, values.lesson),
    onSuccess: async (data: any) => {
      customToast("Lesson created successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useEditLesson = () =>
  useMutation({
    mutationFn: (values: { lesson: LessonData, courseId: string, moduleId: string, lessonId: string }) =>
      Request.put(`/courses/${values.courseId}/modules/${values.moduleId}/lessons/${values.lessonId}`, values.lesson),
    onSuccess: async (data: any) => {
      customToast("Lesson edited successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useDeleteLesson = () =>
  useMutation({
    mutationFn: (values: { courseId: string, moduleId: string, lessonId: string }) =>
      Request.delete(`/courses/${values.courseId}/modules/${values.moduleId}/lessons/${values.lessonId}`),
    onSuccess: async (data: any) => {
      customToast("Lesson deleted successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });
