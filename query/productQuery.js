import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../api/api";

export const useGetProductDetailsData = (productId, options) => {
  return useQuery({
    queryFn: () => {
      return API.get(`/getproddetails/${productId}`);
    },
    queryKey: ["PRODUCT_DETAILS", productId],
    ...options,
  });
};

export const useGetProductReview = (productId, options) => {
  return useQuery({
    queryFn: () => {
      return API.get(`/getreview/${productId}`);
    },
    queryKey: ["PRODUCT_REVIEW", productId],
    ...options,
  });
};

export const useAddProductReview = (productId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({fullname, param, rating, reviewText}) => {
      return API.post(`/reviewadd/${productId}`, {fullname, param, rating, reviewText});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["PRODUCT_REVIEW", productId]});
    },
  });
};

export const useGetCartProduct = () => {
  return useQuery({
    queryFn: () => {
      return API.get("/usercartdata");
    },
    queryKey: ["GET_CART_PRODUCT"],
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => {
      return API.post(`/shop/addcartit/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["GET_CART_PRODUCT"]});
    },
  });
};

export const useRemoveCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId) => {
      return API.delete(`/deletecart/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["GET_CART_PRODUCT"]});
    },
  });
};


export const useGetRazorPayKey = (userId, options) => {
  return useQuery({
    queryKey: ["RAZORPAY_KEY"],
    queryFn: () => {
      return API.get('/setpaymentgetkey')
    },
    ...options
  })
}

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (order) => {
      return API.post(`/payments/create-order`, order);
    }
  })
}