import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, } from "./request";
import customToast, { ToastType } from "@/components/Toast";
import { CourseData } from "./course";

export type AssignmentData = {
  title?: string;
  description?: string,
  isVisible?: boolean,
  dueDate?: Date | string,
  course?: CourseData | string,
  courseId?: string,
  isGradesPublished?: boolean,
  _id?: string,
  createdAt?: Date,
  file?: { name?: string, url?: string, filename?: string, file?: string };
  isSubmitted?: boolean;
  grade?: number;
  feedback?: number;
  submittedFile?: any;
}

export type submissionData = {
  _id: string;
  file?: { name: string, url: string };
  student: {
    _id: string;
    account_id: string;
    firstname: string;
    lastname: string;
  },
  comment?: string;
  grade: number;
  feedback: string;
  createdAt: string
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

export const useSubmitAssignment = () =>
  useMutation({
    mutationFn: (values: { assignmentId: string, comment: string, file?: { name?: string, url?: string, filename?: string, file?: string } }) =>
      Request.post(`/assignments/submit`, values),
    onSuccess: async (data: any) => {
      customToast("Assignment submitted successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });

export const useGetAssignmentSubmission = (assignmentId?: string) =>
  useQuery({
    queryKey: ["getAssignmentSubmission",],
    queryFn: () => {
      return Request.get(`assignments/${assignmentId}/submissions`).then(res => res)
    },
  });

export const useGradeAssignment = () =>
  useMutation({
    mutationFn: (values: { submissionId: string, data: { feedback: string, grade: number } }) =>
      Request.put(`/assignments/submissions/${values.submissionId}`, values.data),
    onSuccess: async (data: any) => {
      customToast("Submission graded successfully", ToastType.success);
    },
    onError: (err: string) => {
      customToast(err, ToastType.error);
    },
  });