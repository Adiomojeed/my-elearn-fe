import { useMutation, useQuery } from "@tanstack/react-query";
import { Request, tokenConfig as config } from "./request";


export const useGetUsers = ({ page, limit }: { page: number, limit: number }) =>
  useQuery({
    queryKey: ["getUsers",],
    queryFn: () => {
      return Request.get(`/admin/users?page=${page}&limit=${limit}`).then(res => res)
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