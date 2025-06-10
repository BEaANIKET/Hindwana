import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,                   
} from "react-native";
import BottomProduct from "../components/Main/bottomproduct";
import ProductCard from "../components/shared/productCard";
import { useGetSearchResult, useGetTreandingResult } from "../query/searchQuery";
import { useDebounce } from "../utils/debounce";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const {data: treandingResult = [], isLoading: treandingLoading} = useGetTreandingResult({
    enabled: !search,
  });

  const {data: searchResult = [], isLoading: searchLoading} = useGetSearchResult(debouncedSearch, {
    enabled: !!search,
  });

  const isLoading = search ? searchLoading : treandingLoading;
  const dataToRender = search ? searchResult : treandingResult;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#8F8F8F"
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <TouchableOpacity style={styles.searchButton} onPress={() => Keyboard.dismiss()}>
          <Ionicons name="search" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#4285F4" style={styles.loader} />
      ) : (
        <FlatList
          data={dataToRender}
          keyExtractor={(item) => item._id}
          numColumns={2}
          keyboardShouldPersistTaps="handled"
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          renderItem={({item}) => (
            <View style={styles.cardWrapper}>
              <ProductCard product={item} />
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
          ListFooterComponent={<BottomProduct />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f5f5f5",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    overflow: "hidden",
    height: 46,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333333",
  },
  searchButton: {
    backgroundColor: "#4285F4",
    width: 46,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
});
