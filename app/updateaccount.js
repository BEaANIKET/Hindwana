import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker"; // using expo image picker (better for React Native)
import axios from "axios";
// import { useAuth } from "../stores/Auth"; 

const UpdateAccount = () => {
    // const { user, isLoggedIn } = useAuth();
    const backendUrl = "https://socket.hindwana.com";

    const [value, setValue] = useState({
        email: "",
        fullname: "",
        phone: "",
        profilepicture: ""
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         Alert.alert("Not Logged In", "You are not logged in.", [
    //             { text: "OK", onPress: () => console.log("Redirect to login screen") },
    //         ]);
    //         // Navigate to login page here if using React Navigation
    //     }
    // }, [isLoggedIn]);

    // const getAccountDetail = async () => {
    //     if (!user?._id) return;

    //     try {
    //         const res = await axios.get(`${backendUrl}/api/getaccount/${user._id}`);
    //         setValue({
    //             email: res.data.email || "",
    //             fullname: res.data.fullname || "",
    //             phone: res.data.phone || "",
    //             profilepicture: res.data.profilepicture || ""
    //         });
    //     } catch (err) {
    //         console.error("Error fetching account details:", err);
    //     }
    // };

    // useEffect(() => {
    //     getAccountDetail();
    // }, [user?._id]);

    const handleProfilePictureChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            setValue({ ...value, profilepicture: result.assets[0].uri });
        }
    };

    const handleSubmit = async () => {
        // if (!user?._id) return;

        // setLoading(true);

        // const formData = new FormData();
        // formData.append("email", value.email);
        // formData.append("fullname", value.fullname);
        // formData.append("phone", value.phone);
        // if (image) {
        //     formData.append("profilepicture", {
        //         uri: image.uri,
        //         name: "profile.jpg",
        //         type: "image/jpeg",
        //     });
        // }
        // formData.append("user", user._id);

        // try {
        //     await axios.post(`${backendUrl}/api/updateaccount/${user._id}`, formData, {
        //         headers: { "Content-Type": "multipart/form-data" },
        //     });
        //     Alert.alert("Success", "Account updated successfully!");
        // } catch (err) {
        //     Alert.alert("Error", err.response?.data?.message || "Failed to update account.");
        // } finally {
        //     setLoading(false);
        // }
        console.log("Handle Submit");
        
    };

    const handleChange = (key, text) => {
        setValue({ ...value, [key]: text });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Account</Text>

            <TouchableOpacity onPress={handleProfilePictureChange}>
                {value.profilepicture ? (
                    <Image source={{ uri: value.profilepicture }} style={styles.profileImage} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No Image</Text>
                    </View>
                )}
                <Text style={styles.uploadText}>Upload New Image</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={value.fullname}
                onChangeText={(text) => handleChange("fullname", text)}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[styles.input, { backgroundColor: "rgb(240,240,240)" }]}
                value={value.email}
                editable={false}
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={value.phone}
                keyboardType="phone-pad"
                maxLength={10}
                onChangeText={(text) => handleChange("phone", text)}
            />

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.button}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Update Account</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default UpdateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "rgb(0,0,0)",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 10,
    },
    noImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgb(220,220,220)",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10,
    },
    noImageText: {
        color: "rgb(100,100,100)",
    },
    uploadText: {
        textAlign: "center",
        fontSize: 12,
        color: "rgb(50,150,250)",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        color: "rgb(60,60,60)",
    },
    input: {
        borderWidth: 1,
        borderColor: "rgb(200,200,200)",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        color: "rgb(0,0,0)",
    },
    button: {
        backgroundColor: "rgb(30,144,255)",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
