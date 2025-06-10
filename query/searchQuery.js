import { useQuery } from "@tanstack/react-query";
import API from "../api/api";

export const useGetSearchResult = (search, options) => {
  return useQuery({
    queryKey: ["SEARCH_RESULT", search],
    queryFn: () => {
      return API.post(`/productsearch/?search=${search}`, {search});
    },
    ...options,
  });
};

export const useGetTreandingResult = (options) => {
  return useQuery({
    queryKey: ["TREANDING_RESULT"],
    queryFn: () => {
      return API.get("/fetchsearchtrending");
    },
    ...options,
  });
};
