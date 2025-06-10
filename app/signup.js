import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Modal
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from 'expo-router';

// Ensure the browser redirects back to your app
WebBrowser.maybeCompleteAuthSession();

export default function Signup() {
  // User input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigation = useNavigation();
  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  
  // OTP input refs
  const otpInputRefs = React.useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ]);

  // Setup Google OAuth (you'll need to replace with your own credentials)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      // Handle successful Google signup
      const { authentication } = response;
      console.log('Google Auth Success:', authentication);
      Alert.alert('Google Sign-Up Successful', 'You have successfully signed up with Google!');
    }
  }, [response]);

  // Validation functions
  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // Event handlers
  const handleSendOtp = () => {
    let isValid = true;
    
    // Reset errors
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');
    
    // Validate name
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else if (!validateName(name)) {
      setNameError('Name must be at least 2 characters');
      isValid = false;
    }
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    // Validate phone
    if (!phone) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (!validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate sending OTP
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        setOtpSent(true);
        setShowOtpModal(true);
        // In a real app, you would send the OTP to the user's phone here
        console.log('OTP sent to:', phone);
        Alert.alert('OTP Sent', `A verification code has been sent to ${phone}`);
      }, 1500);
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto focus next input if current input is filled
    if (text && index < 3) {
      otpInputRefs.current[index + 1].current.focus();
    }
  };

  const handleSignup = () => {
    // Validate OTP
    if (otp.join('').length !== 4) {
      setOtpError('Please enter the 4-digit verification code');
      return;
    }
    
    setOtpError('');
    setIsAuthenticating(true);
    
    // Simulate OTP verification & signup
    setTimeout(() => {
      setIsAuthenticating(false);
      setShowOtpModal(false);
      
      // In a real app, you would verify the OTP and create a user account here
      console.log('Signup data:', { name, email, phone, password, otp: otp.join('') });
      Alert.alert('Signup Successful', 'Your account has been created successfully!');
    }, 1500);
  };

  const handleGoogleSignUp = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.log('Google Sign Up Error:', error);
      Alert.alert('Authentication Error', 'Failed to sign up with Google');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // UI Components
  const renderOtpModal = () => {
    return (
      <Modal
        visible={showOtpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOtpModal(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Phone Verification</Text>
              <Text style={styles.modalSubtitle}>
                Enter the 4-digit code sent to {phone}
              </Text>
              
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    ref={otpInputRefs.current[index]}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={otp[index]}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    autoFocus={index === 0}
                  />
                ))}
              </View>
              
              {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
              
              <TouchableOpacity 
                style={[styles.verifyButton, isAuthenticating && styles.buttonDisabled]} 
                onPress={handleSignup}
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <Text style={styles.buttonText}>Verifying...</Text>
                ) : (
                  <Text style={styles.buttonText}>Verify & Sign Up</Text>
                )}
              </TouchableOpacity>
              
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                <TouchableOpacity onPress={handleSendOtp}>
                  <Text style={styles.resendLink}>Resend</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowOtpModal(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground 
        source={{ uri: 'https://via.placeholder.com/1080x1920/4C6FFF/FFFFFF?text=' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.logoContainer}>
                <Image 
                  source={{ uri: 'https://socket.hindwana.com/public/Images/12cc8d5fe0342ad09e0933734c5f365e' }}
                  style={styles.logo} 
                />
                <Text style={styles.appName}>Hindwana</Text>
              </View>
              
              <View style={styles.formContainer}>
                <Text style={styles.title}>Create Account</Text>
                
                <View style={styles.inputContainer}>
                  {/* Name Input */}
                  <Text style={styles.label}>Full Name</Text>
                  <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
                    <Ionicons name="person-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your name"
                      placeholderTextColor="#999"
                      value={name}
                      onChangeText={(text) => {
                        setName(text);
                        if (nameError) setNameError('');
                      }}
                    />
                  </View>
                  {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                  
                  {/* Email Input */}
                  <Text style={styles.label}>Email</Text>
                  <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
                    <Ionicons name="mail-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your email"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError('');
                      }}
                    />
                  </View>
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                  
                  {/* Phone Input */}
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={[styles.inputWrapper, phoneError ? styles.inputError : null]}>
                    <Ionicons name="call-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={(text) => {
                        setPhone(text);
                        if (phoneError) setPhoneError('');
                      }}
                    />
                  </View>
                  {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                  
                  {/* Password Input */}
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Create a password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (passwordError) setPasswordError('');
                      }}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                      <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#555" />
                    </TouchableOpacity>
                  </View>
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                  
                  {/* Confirm Password Input */}
                  <Text style={styles.label}>Confirm Password</Text>
                  <View style={[styles.inputWrapper, confirmPasswordError ? styles.inputError : null]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm your password"
                      placeholderTextColor="#999"
                      secureTextEntry={!showConfirmPassword}
                      value={confirmPassword}
                      onChangeText={(text) => {
                        setConfirmPassword(text);
                        if (confirmPasswordError) setConfirmPasswordError('');
                      }}
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
                      <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#555" />
                    </TouchableOpacity>
                  </View>
                  {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                </View>
                
                <TouchableOpacity 
                  style={[styles.sendOtpButton, isAuthenticating && styles.buttonDisabled]} 
                  onPress={handleSendOtp}
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? (
                    <Text style={styles.buttonText}>Sending...</Text>
                  ) : (
                    <Text style={styles.buttonText}>
                      {otpSent ? "Resend OTP" : "Send OTP"}
                    </Text>
                  )}
                </TouchableOpacity>
                
                <View style={styles.orContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.divider} />
                </View>
                
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
                  <AntDesign name="google" size={20} color="#EA4335" />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.loginLink}>Log In</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
      
      {renderOtpModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputError: {
    borderColor: '#FF5757',
    borderWidth: 1.5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  errorText: {
    color: '#FF5757',
    fontSize: 12,
    marginTop: -4,
    marginBottom: 8,
    marginLeft: 4,
  },
  sendOtpButton: {
    backgroundColor: '#4C6FFF',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A8B8FF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 15,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 48,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#4C6FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  verifyButton: {
    backgroundColor: '#4C6FFF',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#4C6FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});