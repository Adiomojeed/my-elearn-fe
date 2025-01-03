import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";
// import { User } from "./types";
// import customToast, { ToastType } from "@/components/Toast";
// import { IUSer, useUser } from "@/utils/userContext";

export const useCalculateVolume = () => {
  return useMutation({
    mutationFn: (values: {
      container_type: string,
      diameter: number,
      height?: number,
      tank_head?: string
    }) =>
      Request.post(`/volumes`, values),
    onSuccess: async (data: any) => {
      // console.log(data)
    }
  })
};

export const useSaveTank = () => {
  return useMutation({
    mutationFn: (values: {
      name: string,
      number: string,
      location: string,
      company: string,
      volume: number
    }) =>
      Request.post(`/tanks`, values),
    onSuccess: async (data: any) => {
      // console.log(data)
    }
  })
};

export const useGetTanks = () =>
  useQuery({
    queryKey: ["getTanks",],
    queryFn: () => {
      return Request.get(`/tanks`).then(res => res)
    },
  });