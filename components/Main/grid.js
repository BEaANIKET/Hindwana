import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Grid({info}) {
  const windowWidth = Dimensions.get("window").width;

  // Card data - images and captions
  const cardData = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070",
      caption: "Fresh Mango",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2187",
      caption: "something good",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070",
      caption: "Raghav Jha nn",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070",
      caption: "fukra insaan",
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?q=80&w=2070",
      caption: "fukra insaan",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {info?.map((item) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item?._id}`)}>
            <View key={item._id} style={[styles.card, {width: windowWidth / 2 - 12}]}>
              <Image
                source={{uri: `https://socket.hindwana.com/public/Images/${item?.image}`}}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.captionContainer}>
                <Text style={styles.caption}>{item.Title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
    backgroundColor: "#f5f5f5",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  captionContainer: {
    padding: 12,
    alignItems: "center",
  },
  caption: {
    fontSize: 14,
    color: "#666",
  },
});
