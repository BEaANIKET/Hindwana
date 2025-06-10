import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const demoData = [
  {
    _id: "1",
    Title: "Electronics",
    image: "https://socket.hindwana.com/public/Images/8a7deb92290833e2cc8afa1e0c423101",
  },
  {
    _id: "2",
    Title: "Fashion",
    image: "https://socket.hindwana.com/public/Images/ed05fa85ea5ce15414ebf70a41b0676e",
  },
  {
    _id: "3",
    Title: "Home",
    image: "https://socket.hindwana.com/public/Images/874f16660caac4b27144c098f3a7dc8c",
  },
  {
    _id: "4",
    Title: "Beauty",
    image: "https://socket.hindwana.com/public/Images/cb932ad666abddad8e2852b50349e2ba",
  },
  {
    _id: "5",
    Title: "Toys",
    image: "https://socket.hindwana.com/public/Images/c2847bc913eac7260a1036705514f8ca",
  },
  {
    _id: "6",
    Title: "Sports",
    image: "https://socket.hindwana.com/public/Images/c2847bc913eac7260a1036705514f8ca",
  },
];

const Category = ({info}) => {
  const [brandLogos, setBrandLogos] = useState([]);
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  useEffect(() => {
    setBrandLogos(demoData);
  }, []);

  const handleSearchClick = () => {
    navigation.navigate("Search"); // ensure you have a Search screen defined
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}>
        {info?.map((brand) => (
          <TouchableOpacity
            key={brand._id}
            style={styles.itemContainer}
            onPress={() => router.push(`/category/${encodeURIComponent(brand?.Title)}`)}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: `https://socket.hindwana.com/public/Images/${brand?.image}`}}
                style={styles.image}
              />
            </View>
            <Text style={styles.titleText}>{brand.Title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    backgroundColor: "rgb(229,243,232)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#4285F4",
    borderRadius: 20,
    padding: 8,
    marginLeft: 8,
  },
  scrollContent: {
    marginTop: 20,
    paddingRight: 10,
  },
  itemContainer: {
    alignItems: "center",
    marginRight: 20,
    width: 70,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleText: {
    marginTop: 6,
    fontSize: 10,
    textAlign: "center",
  },
});

export default Category;
