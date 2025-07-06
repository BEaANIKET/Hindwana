import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useRegisterUser, useSendOtp } from "../query/authQuery";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [sendOtpError, setSentOtpError] = useState("");
  const {mutate: sendOtp, isPending: sendOtpLoading} = useSendOtp();
  const {mutate: signup, isPending: signupLoading, error: signUpError} = useRegisterUser();

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      otp: "",
    });
    setShowPassword(false);
    setOtpSent(false);
    setOtp("");
    setFormErrors({});
  };

  // Navigate to login
  const navigateToLogin = () => {
    router.push("/login");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Please enter your name";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter your email";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      errors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Please enter your phone number";
    } else if (formData.phoneNumber.length < 10) {
      errors.phoneNumber = "Please enter a valid phone number (at least 10 digits)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateOtp = () => {
    const errors = {};

    if (!formData.otp.trim()) {
      errors.otp = "Please enter the OTP";
    } else if (formData.otp.length !== 6) {
      errors.otp = "Please enter a valid 6-digit OTP";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) return;

    // Clear previous errors
    setFormErrors({});

    sendOtp(
      {email: formData?.email},
      {
        onSuccess: (data) => {
          console.log("OTP sent successfully:", data);
          setOtp(data);
          setOtpSent(true);
        },
        onError: (error) => {
          console.error("Send OTP error:", error);
          setSentOtpError(error?.msg || "internal server error");
          // Error will be handled by the error display component
        },
      }
    );
  };

  const handleSignUp = async () => {

    if (!validateOtp()) return;
    if (otp !== formData?.otp) {
      console.log("return via wronge otp");
      setSentOtpError("invalid otp ");
      return;
    }
    // Clear previous errors
    setSentOtpError("");
    setFormErrors({});

    signup(
      {
        email: formData?.email,
        phone: formData?.phoneNumber,
        password: formData?.password,
        otp: formData?.otp,
        fullname: formData?.name,
      },
      {
        onSuccess: async (data) => {
          console.log("Sign up successful");
          await AsyncStorage.setItem("token", data?.token);
          await AsyncStorage.setItem("userId", data?.userId);
          router.push("(tabs)");
        },
        onError: (error) => {
          console.error("Sign up error:", error);
          // Error will be handled by the error display component
        },
      }
    );
  };

  const handleGoogleSignUp = () => {
    Alert.alert("Google Sign Up", "Google sign up functionality would be implemented here");
  };

  // Helper function to get error message
  const getErrorMessage = (error) => {
    if (!error) return "";

    // Handle different error structures
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    if (error.msg) return error.msg;
    if (error.error) return error.error;
    if (error.data?.message) return error.data.message;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response?.data?.msg) return error.response.data.msg;

    return "An unexpected error occurred. Please try again.";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign-Up Hindwana</Text>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              editable={!otpSent}
              style={[
                styles.input,
                otpSent && styles.disabledInput,
                formErrors.name && styles.errorInput,
              ]}
              placeholderTextColor="#9CA3AF"
            />
            {formErrors.name && <Text style={styles.errorText}>{formErrors.name}</Text>}
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              editable={!otpSent}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                otpSent && styles.disabledInput,
                formErrors.email && styles.errorInput,
              ]}
              placeholderTextColor="#9CA3AF"
            />
            {formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter your password"
                value={formData.password}
                onChangeText={(value) => handleInputChange("password", value)}
                editable={!otpSent}
                secureTextEntry={!showPassword}
                style={[
                  styles.passwordInput,
                  otpSent && styles.disabledInput,
                  formErrors.password && styles.errorInput,
                ]}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                disabled={otpSent}
                style={styles.eyeButton}>
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
            {formErrors.password && <Text style={styles.errorText}>{formErrors.password}</Text>}
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              editable={!otpSent}
              keyboardType="phone-pad"
              style={[
                styles.input,
                otpSent && styles.disabledInput,
                formErrors.phoneNumber && styles.errorInput,
              ]}
              placeholderTextColor="#9CA3AF"
            />
            {formErrors.phoneNumber && (
              <Text style={styles.errorText}>{formErrors.phoneNumber}</Text>
            )}
          </View>

          {/* OTP Input - Only show after OTP is sent */}
          {otpSent && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter OTP</Text>
              <TextInput
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChangeText={(value) =>
                  handleInputChange("otp", value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                keyboardType="numeric"
                style={[styles.otpInput, formErrors.otp && styles.errorInput]}
                placeholderTextColor="#9CA3AF"
              />
              {formErrors.otp && <Text style={styles.errorText}>{formErrors.otp}</Text>}
            </View>
          )}

          {/* Send OTP Button */}
          {!otpSent ? (
            <TouchableOpacity
              onPress={handleSendOTP}
              disabled={sendOtpLoading}
              style={[styles.sendOtpButton, sendOtpLoading && styles.disabledButton]}>
              {sendOtpLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Send OTP</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={signupLoading}
              style={[styles.signUpButton, signupLoading && styles.disabledButton]}>
              {signupLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          )}

          {/* Resend OTP and Reset Form options */}
          {otpSent && (
            <View style={styles.resendContainer}>
              <TouchableOpacity
                onPress={handleSendOTP}
                disabled={sendOtpLoading}
                style={[styles.resendButton, sendOtpLoading && styles.disabledButton]}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
              <Text style={styles.dividerDot}>•</Text>
              <TouchableOpacity
                onPress={resetForm}
                disabled={sendOtpLoading || signupLoading}
                style={[
                  styles.resendButton,
                  (sendOtpLoading || signupLoading) && styles.disabledButton,
                ]}>
                <Text style={styles.resendButtonText}>Change Details</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Error Display */}
          {(sendOtpError || signUpError) && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>
                {getErrorMessage(sendOtpError || signUpError)}
              </Text>
            </View>
          )}

          {/* Divider and Google Sign Up - Only show when OTP not sent */}
          {!otpSent && (
            <>
              <Text style={styles.dividerText}>Or continue with</Text>

              {/* Google Sign Up Button */}
              <TouchableOpacity onPress={handleGoogleSignUp} style={styles.googleButton}>
                <Text style={styles.googleIcon}>🔍</Text>
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
              </TouchableOpacity>

              {/* Sign In Link */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.signInLink}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Login Navigation - Show when OTP is sent */}
          {otpSent && (
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <TouchableOpacity onPress={navigateToLogin}>
                <Text style={styles.signInLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1D4ED8",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
    fontSize: 14,
    color: "#111827",
  },
  errorInput: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  disabledInput: {
    opacity: 0.6,
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
    fontSize: 14,
    color: "#111827",
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    padding: 4,
  },
  otpInput: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
    fontSize: 18,
    color: "#111827",
    textAlign: "center",
    letterSpacing: 6,
  },
  sendOtpButton: {
    width: "100%",
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#10B981",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  resendButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  resendButtonText: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  dividerDot: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 4,
  },
  errorContainer: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  errorMessage: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  dividerText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginVertical: 16,
  },
  googleButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  googleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  googleButtonText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  signInText: {
    color: "#6B7280",
    fontSize: 12,
  },
  signInLink: {
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

export default SignUp;
