import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { PageLoading } from "../../components/PageLoading";
import { ProductDetail } from "../../components/Product";
import { useGetProductDetailsData, useGetProductReview } from "../../query/productQuery";

export default function ProductPage() {
  const { id } = useLocalSearchParams();

  const {
    data: product,
    isLoading: getProductLoading,
    error: getProductError,
  } = useGetProductDetailsData(id, {
    enabled: !!id,
  });
  const { data: reviews, isLoading: getReviewsLoading } = useGetProductReview(id, {
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
