import { useQuery } from "@tanstack/react-query";
import API from "../api/api";

export const useGetCategory = (title, options) => {
  return useQuery({
    queryKey: ["GET_CATEGORY", title],
    queryFn: () => {
      return API.post(`/getcategoryproduct/1`, {value: title});
    },
    ...options,
  });
};
