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
  Dimensions,
  SafeAreaView,
  ImageBackground,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from 'expo-router';

// Ensure the browser redirects back to your app
WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigation = useNavigation();
  // Setup Google OAuth (you'll need to replace with your own credentials)
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      // Handle successful Google login
      const { authentication } = response;
      console.log('Google Auth Success:', authentication);
      Alert.alert('Google Sign-In Successful', 'You have successfully signed in with Google!');
    }
  }, [response]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      setIsAuthenticating(true);
      // Simulate authentication
      setTimeout(() => {
        setIsAuthenticating(false);
        console.log('Login credentials:', { email, password });
        Alert.alert('Login Successful', `Welcome back, ${email}!`);
      }, 1500);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.log('Google Sign In Error:', error);
      Alert.alert('Authentication Error', 'Failed to sign in with Google');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
                <View style={styles.inputContainer}>
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
                  
                  <Text style={styles.label}>Password</Text>
                  <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#555" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
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
                </View>
                
                <TouchableOpacity 
                  style={[styles.loginButton, isAuthenticating && styles.loginButtonDisabled]} 
                  onPress={handleLogin}
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? (
                    <View style={styles.loadingContainer}>
                      <Text style={styles.loginButtonText}>Logging in...</Text>
                    </View>
                  ) : (
                    <Text style={styles.loginButtonText}>Login</Text>
                  )}
                </TouchableOpacity>
                
                <View style={styles.orContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.divider} />
                </View>
                
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
                  <AntDesign name="google" size={20} color="#EA4335" />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
                
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
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
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
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
    marginTop: 10,
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
  },
  inputContainer: {
    marginBottom: 15,
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
  loginButton: {
    backgroundColor: '#4C6FFF',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#4C6FFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: '#A8B8FF',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#4C6FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});