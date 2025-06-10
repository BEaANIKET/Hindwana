import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import Accordion from "../../components/Profile/Accordian";
import { useNavigation } from "expo-router";


const acount = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigation = useNavigation();
  const user = {
    fullname: "John Doe",
    role: "Admin",
    profilePicture: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
    coverPhoto: "https://iwritingsolutions.com/wp-content/uploads/2022/05/f2e25fa89ad3e970aeb994db60a81303.jpg", // Demo cover image
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image */}
      <ImageBackground source={{ uri: user.coverPhoto }} style={styles.coverImage} />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
          onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3081/3081840.png")}
        />
        <Text style={styles.name}>{user.fullname}</Text>
        <Text style={styles.role}>{user.role}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {isLoggedIn ? (
            <>
              <TouchableOpacity style={styles.logoutButton} onPress={() => setIsLoggedIn(false)}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dashboardButton} onPress={() => navigation.navigate('ai')}>
                <Text style={styles.buttonText}>Your AI</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.partnerButton} onPress={() => navigation.navigate('ai')}>
                <Text style={styles.buttonText}>Your AI</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <Accordion />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  coverImage: { height: 180, width: "100%" },
  profileContainer: { alignItems: "center", marginTop: -50 },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: "#fff" },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  role: { color: "gray" },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  loginButton: { backgroundColor: "green", padding: 10, borderRadius: 5, margin: 5 },
  logoutButton: { backgroundColor: "red", padding: 10, borderRadius: 5, margin: 5 },
  dashboardButton: { backgroundColor: "blue", padding: 10, borderRadius: 5, margin: 5 },
  partnerButton: { backgroundColor: "blue", padding: 10, borderRadius: 5, margin: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
});

export default acount;
