import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-web";
import ActiveSlider from "../../components/Main/activeslider";
import BottomProduct from "../../components/Main/bottomproduct";
import Category from "../../components/Main/category";
import Grid from "../../components/Main/grid";
import Hero from "../../components/Main/hero";
const HomeScreen = ({onSearch}) => {
  const navigation = useNavigation();
  const [info, setInfo] = useState([]);
  const gethome = async () => {
    try {
      const res = await axios.get("https://socket.hindwana.com/api/getHome");
      setInfo(res.data);
    } catch (error) {}
  };
  useEffect(() => {
    gethome();
  }, []);

  console.log("hello  oooooooooooo");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: `https://socket.hindwana.com/public/Images/${info?.top?.image}`}}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.container}>
            {/* Top row with logo and delivery info */}
            <View style={styles.topRow}>
              {/* Logo */}
              <Image
                source={{
                  uri: `https://socket.hindwana.com/public/Images/${info?.value?.squareLogo}`,
                }}
                style={styles.logo}
                resizeMode="contain"
              />

              {/* Delivery info */}
              <View style={styles.deliveryInfo}>
                <Text style={styles.deliveryTime}>
                  <Text style={styles.bold}>15 Min</Text> Only
                </Text>
                <Text style={styles.deliveryText}>Enjoy Fast Delivery</Text>
              </View>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#8F8F8F"
                onFocus={() => navigation.navigate("SearchPage")}
                onPress={Keyboard.dismiss}
              />
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Main Content */}
        <Category info={info?.category} />
        <Hero info={info?.banner} />
        <BottomProduct info={info?.bottomproduct} />
        <ActiveSlider info={info?.newproduct} />
        <Grid info={info?.featured} />
        {/* <Two />
        <Three /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: 220,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  deliveryInfo: {
    alignItems: "flex-end",
  },
  deliveryTime: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
  },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  deliveryText: {
    fontSize: 14,
    color: "#004080",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    overflow: "hidden",
    height: 46,
    marginTop: 80,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
});

export default HomeScreen;
