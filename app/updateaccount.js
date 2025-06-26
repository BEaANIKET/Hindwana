import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "../context/AuthProvider";
import { useUpdateProfile } from "../query/authQuery";

const UpdateAccount = () => {
  const { user, isAuth } = useAuth();
  const backendUrl = "https://socket.hindwana.com";
  const { mutate: updateProfile, isPending: updateUserLoading } = useUpdateProfile();

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    phone: "",
    profilepicture: null,
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user && isAuth) {
      setForm({
        email: user.email || "",
        fullname: user.fullname || "",
        phone: user.phone || "",
        profilepicture: user.profilepicture || null,
      });
    }
  }, [user, isAuth]);

  useEffect(() => {
    if (user) {
      const original = {
        email: user.email || "",
        fullname: user.fullname || "",
        phone: user.phone || "",
        profilepicture: user.profilepicture || null,
      };
      setHasChanges(JSON.stringify(form) !== JSON.stringify(original));
    }
  }, [form, user]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Permission to access media library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const selected = result.assets[0];
      setForm((prev) => ({
        ...prev,
        profilepicture: {
          uri: selected.uri,
          name: selected.fileName || "profile.jpg",
          type: selected.type || "image/jpeg",
        },
      }));
    }
  };

  const validate = () => {
    if (!form.fullname.trim()) {
      Alert.alert("Validation Error", "Full name is required");
      return false;
    }
    if (!form.phone.trim()) {
      Alert.alert("Validation Error", "Phone number is required");
      return false;
    }
    if (form.phone.length < 10) {
      Alert.alert("Validation Error", "Phone number must be at least 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!hasChanges) {
      Alert.alert("No Changes", "No changes to update.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("fullname", form.fullname.trim());
      formData.append("phone", form.phone.trim());
      formData.append("user", user.id || user._id);

      if (form.profilepicture?.uri) {
        formData.append("profilepicture", {
          uri: form.profilepicture.uri,
          name: form.profilepicture.name,
          type: form.profilepicture.type,
        });
      }

      updateProfile(formData, {
        onSuccess: () => {
          Alert.alert("Success", "Profile updated successfully!");
          setHasChanges(false);
        },
        onError: (error) => {
          console.error("Update error:", error);
          Alert.alert("Update Failed", error?.response?.data?.message || "Try again later.");
        },
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const displayImage = () => {
    if (form.profilepicture?.uri) return form.profilepicture.uri;
    if (typeof form.profilepicture === "string") {
      return form.profilepicture.startsWith("http")
        ? form.profilepicture
        : `${backendUrl}${form.profilepicture}`;
    }
    return null;
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  if (!isAuth || !user) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Please log in to update your profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Account</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {displayImage() ? (
          <Image source={{ uri: displayImage() }} style={styles.profileImage} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>No Image</Text>
          </View>
        )}
        <Text style={styles.uploadText}>
          {form.profilepicture ? "Change Image" : "Upload Image"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        value={form.fullname}
        onChangeText={(text) => handleChange("fullname", text)}
        placeholder="Enter your full name"
        maxLength={50}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={form.email}
        editable={false}
        placeholder="Email (cannot be changed)"
      />

      <Text style={styles.label}>Phone Number *</Text>
      <TextInput
        style={styles.input}
        value={form.phone}
        keyboardType="phone-pad"
        maxLength={15}
        onChangeText={(text) => handleChange("phone", text)}
        placeholder="Enter your phone number"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, (!hasChanges || updateUserLoading) && styles.buttonDisabled]}
        disabled={!hasChanges || updateUserLoading}
      >
        {updateUserLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Update Account</Text>
        )}
      </TouchableOpacity>

      {hasChanges && <Text style={styles.changesIndicator}>* You have unsaved changes</Text>}
    </View>
  );
};

export default UpdateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "dodgerblue",
  },
  noImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  noImageText: {
    color: "#666",
    fontSize: 14,
  },
  uploadText: {
    textAlign: "center",
    fontSize: 14,
    color: "dodgerblue",
    marginTop: 8,
    fontWeight: "500",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#3c3c3c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: "#000",
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: "#f5f5f5",
    color: "#888",
  },
  button: {
    backgroundColor: "dodgerblue",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#bbb",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: "crimson",
    textAlign: "center",
  },
  changesIndicator: {
    textAlign: "center",
    fontSize: 12,
    color: "orange",
    marginTop: 10,
    fontStyle: "italic",
  },
});
