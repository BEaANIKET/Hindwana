import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const demoData = [
  { _id: "1", image: "https://socket.hindwana.com/public/Images/c98894133e9f581a95674c5d130c0503", Title: "Product One" },
  { _id: "2", image: "https://socket.hindwana.com/public/Images/a2b2f19e7423e23782bf262ed3fd413f", Title: "Another Product" },
  { _id: "3", image: "https://socket.hindwana.com/public/Images/e3935423d13b7707efc359d481265e61", Title: "Cool Item" },
  { _id: "4", image: "https://socket.hindwana.com/public/Images/75c3aba8c8aeb723cf661b8f73fa1d8e", Title: "Something Nice" },
  { _id: "5", image: "https://socket.hindwana.com/public/Images/c893fbd932729dd22572f434e7f43308", Title: "Awesome Thing" },
];

const BottomProduct = ({info}) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {info?.map((brand) => (
          <TouchableOpacity
            key={brand._id}
            style={styles.card}
            onPress={() => 
              router.push(`/product/${brand?._id}`)
            }
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: `https://socket.hindwana.com/public/Images/${brand?.image}`}} style={styles.image} />
            </View>
            <Text style={styles.title}>
              {brand.Title.length > 15 ? brand.Title.slice(0, 15) + "..." : brand.Title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    alignItems: "center",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    gap: 10,
  },
  card: {
    alignItems: "center",
    width: 150,
  },
  imageWrapper: {
    width: 150,
    height: 150,
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "center",
  },
});

export default BottomProduct;
