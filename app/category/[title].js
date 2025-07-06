import { useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { PageLoading } from "../../components/PageLoading";
import ProductCard from "../../components/shared/productCard";
import { useGetCategory } from "../../query/categoryQuery";

export default function Category() {
  const {title} = useLocalSearchParams();

  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    error,
  } = useGetCategory(title, {
    enabled: !!title,
    retry: 3,
  });

  if (categoryDataLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <View> {error?.message} </View>;
  }


  return (
    <FlatList
      data={categoryData}
      numColumns={2}
      keyExtractor={(item) => item._id}
      renderItem={({item}) => (
        <View style={styles.cardWrapper}>
          <ProductCard product={item} />
        </View>
      )}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
    />
  );
}
const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
});
