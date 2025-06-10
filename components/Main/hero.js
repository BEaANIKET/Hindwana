import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const Hero = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://socket.hindwana.com/public/Images/2550d0accb4aa7d867e9c6e4b712de6a" }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* <View style={styles.overlay}>
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.subtitle}>Find your best deals here!</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenWidth - 50, // make it a perfect square
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Hero;
