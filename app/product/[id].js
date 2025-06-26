import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-web";
import { PageLoading } from "../../components/PageLoading";
import { ProductDetail } from "../../components/Product";
import { useAddProductReview, useGetProductDetailsData, useGetProductReview } from "../../query/productQuery";

export default function Reviews() {
  const {id} = useLocalSearchParams();

  const {
    data: product,
    isLoading: getProductLoading,
    error: getProductError,
  } = useGetProductDetailsData(id, {
    enabled: !!id,
  });
  const {data: reviews, isLoading: getReviewsLoading} = useGetProductReview(id, {
    enabled: !!id,
  });


  if (getProductLoading) {
    return <PageLoading />;
  }

  return (
    <ScrollView>
      <ProductDetail
        product={product?.productdetail}
        reviewsData={{
          reviews,
          loading: getReviewsLoading,
        }}
      />
    </ScrollView>
  );
}
