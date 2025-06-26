import { useNavigation } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Accordion from "../../components/Profile/Accordian";
import { ImageUri } from "../../constants/ImageUri";
import { useAuth } from "../../context/AuthProvider";
import { useLogout } from "../../query/authQuery";

const account = () => {
  const navigation = useNavigation();
  const {user, isAuth} = useAuth();
  const {logout} = useLogout();

  console.log(user);

  console.log("user from profile ", user, isAuth);

  const handleLogout = () => {
    logout(); // Call logout function from auth context
  };

  const handleLogin = () => {
    navigation.navigate("login");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover Image - using a default gradient background */}
      <View style={styles.coverImage} />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: ImageUri(user.profilepicture)}}
          style={styles.profileImage}
          onError={() => {
            // Handle image load error for React Native
            console.log("Profile image failed to load");
          }}
        />
        <Text style={styles.name}>{user.fullname}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.role}</Text>
        {user.phone && <Text style={styles.phone}>📞 {user.phone}</Text>}

        {/* Member since */}
        {user.createdAt && (
          <Text style={styles.memberSince}>
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </Text>
        )}

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          {isAuth ? (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isAuth && <Accordion />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  coverImage: {
    height: 180,
    width: "100%",
    backgroundColor: "#4A90E2", // Default blue gradient background
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -50,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 15,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  role: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "600",
    marginTop: 5,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  memberSince: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 120,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default account;
