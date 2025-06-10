import { useQuery } from "@tanstack/react-query"
import API from "../api/api"


export const useGetProductDetailsData = (productId, options) => {
  return useQuery({
    queryFn: () => {
      return API.get(`/getproddetails/${productId}`)
    },
    queryKey: ["PRODUCT_DETAILS", productId],
    ...options
  })
}

export const useGetProductReview = (productId, options) => {
  return useQuery({
    queryFn: () => {
      return API.get(`/getreview/${productId}`)
    },
    queryKey: ['PRODUCT_REVIEW', productId],
    ...options
  })
}