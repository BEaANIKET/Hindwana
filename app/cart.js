import { AntDesign } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import moment from "moment";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PageLoading } from "../components/PageLoading";
import { ImageUri } from "../constants/ImageUri";
import { useGetCartProduct, useRemoveCartProduct } from "../query/productQuery";

const Cart = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {data: cartData, isLoading: cartDataLoading, refetch} = useGetCartProduct();
  const {mutate: removeProductFromCart, isPending: removeProductFromCartLoading} =
    useRemoveCartProduct();

  if (cartDataLoading) {
    return <PageLoading />;
  }

  console.log(cartData, "from cart page");

  const navigateToPage = (id) => {
    router.push(`/product/${id}`);
  };

  const handleDelete = (id) => {
    removeProductFromCart(id, {
      onSuccess: (data) => {
        Alert.alert("Deleted", data.message || "Item removed from cart successfully");
        refetch(); // Refresh the cart data
      },
      onError: (error) => {
        Alert.alert("Error", "Failed to delete item.");
        console.error("Delete error:", error);
      },
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.itemRow} onPress={() => navigateToPage(item.productId._id)}>
        <Image
          source={{
            uri: item.productId.image
              ? ImageUri(item.productId.image)
              : "https://stock.adobe.chttps://as1.ftcdn.net/v2/jpg/15/04/51/26/1000_F_1504512651_XH09eO4Uh8ahYgCeXmCbwuxmWAJt9tD6.jpg",
          }}
          style={styles.image}
          defaultSource={{
            uri: "https://as1.ftcdn.net/v2/jpg/15/04/51/26/1000_F_1504512651_XH09eO4Uh8ahYgCeXmCbwuxmWAJt9tD6.jpg",
          }}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.productId.Title}</Text>
          <Text style={styles.brand}>{item.productId.brand || "Generic"}</Text>
          <Text style={styles.price}>₹ {item.productId.dprice}</Text>
          <Text style={styles.date}>{moment(item.createdAt).format("MMMM D, YYYY")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(item._id)}
        style={[styles.deleteButton, removeProductFromCartLoading && styles.disabledButton]}
        disabled={removeProductFromCartLoading}>
        <AntDesign name="delete" size={24} color={removeProductFromCartLoading ? "#ccc" : "red"} />
      </TouchableOpacity>
    </View>
  );

  if (loading || removeProductFromCartLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgb(30,144,255)" />
      </View>
    );
  }

  // Show empty state if no cart items
  if (!cartData || cartData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={cartData}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: "#f9fafb",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  itemRow: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  brand: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: "green",
    marginTop: 6,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  deleteButton: {
    padding: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

export default Cart;
