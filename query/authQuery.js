import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import API from "../api/api";
import API_FILE from "../api/api_file";

export const useGetUser = (options) => {
  return useQuery({
    queryFn: () => API.get("/auth/user"),
    queryKey: ["GET_USER"],
    retry: 1,
    ...options,
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({email, password}) => {
      return API.post("/auth/login", {
        email,
        password,
      });
    },
    onSuccess: (data) => {
      AsyncStorage.setItem("token", data?.token);
      AsyncStorage.setItem("userId", data?.userId);
      queryClient.invalidateQueries({queryKey: ["GET_USER"]});
    },
  });
};

export const useRegisterUser = () => {
  const queryClient = QueryClient();
  return useMutation({
    mutationFn: ({email, phone, password, otp, fullname}) => {
      return API.post("/auth/register", {
        email,
        phone,
        fullname,
        otp,
        password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["GET_USER"]});
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationFn: ({email}) => {
      return API.post("/mailotp", {
        userskaOTP: email,
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const logout = useCallback(async () => {
    try {
      // Clear async and local storage
      await AsyncStorage.clear();

      // Invalidate GET_USER query so it reflects logout state
      queryClient.invalidateQueries({queryKey: ["GET_USER"]});
    } catch (error) {
      console.error("Failed during logout:", error);
    }
  }, [queryClient]);

  return {logout};
};


export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      const userId = formData.get("user");      
      return API_FILE.post(`/updateaccount/${userId}`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_USER"] });
    },
  });
};
