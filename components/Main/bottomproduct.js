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
