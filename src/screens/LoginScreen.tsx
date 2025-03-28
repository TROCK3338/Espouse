import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { getAuth, PhoneAuthProvider, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC37bVaqVzMKPq9Y2lhgxKdQ_qcT3yZh0k",
  authDomain: "espouse-b7ef8.firebaseapp.com",
  projectId: "espouse-b7ef8",
  storageBucket: "espouse-b7ef8.appspot.com",
  messagingSenderId: "1002497853400",
  appId: "1:1002497853400:web:98bd13211b9d782fe5d4ad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const recaptchaVerifier = useRef(null);

  // ✅ Google Auth Request
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '1002497853400-bem7nlgsqoel0cb7fgs6t6mlv2fpl56u.apps.googleusercontent.com',
  });

  // ✅ Handle Google Sign-In Response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(null, authentication?.accessToken);
      signInWithCredential(auth, credential)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await AsyncStorage.setItem('isLoggedIn', 'true');
          
          // ✅ Check if profile is complete
          const name = await AsyncStorage.getItem('userName');
          const country = await AsyncStorage.getItem('userCountry');
          const role = await AsyncStorage.getItem('userRole');

          if (name && country && role) {
            navigation.replace('MainTabs');
          } else {
            navigation.replace('ProfileSetup');
          }
        })
        .catch((error) => Alert.alert('Error', error.message));
    }
  }, [response]);

  // ✅ Send OTP
  const sendOtp = async () => {
    try {
      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current!
      );
      setVerificationId(verificationId);
      Alert.alert('OTP Sent', 'Check your messages.');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      await AsyncStorage.setItem('isLoggedIn', 'true');

      // ✅ Check profile completion
      const name = await AsyncStorage.getItem('userName');
      const country = await AsyncStorage.getItem('userCountry');
      const role = await AsyncStorage.getItem('userRole');

      if (name && country && role) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('ProfileSetup');
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/bg-login.png')} style={styles.background}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                attemptInvisibleVerification={true}
              />

              {/* Back Button when OTP is sent */}
              {verificationId && (
                <TouchableOpacity onPress={() => setVerificationId('')} style={styles.backArrow}>
                  <FontAwesome name="arrow-left" size={24} color="#e45ba5" />
                </TouchableOpacity>
              )}

              {/* Phone Number Input */}
              <TextInput
                placeholder="Enter Phone Number"
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={!verificationId}
              />

              {/* OTP Input & Buttons */}
              {verificationId ? (
                <>
                  <TextInput
                    placeholder="Enter OTP"
                    placeholderTextColor="#888"
                    style={styles.input}
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                  />
                  <TouchableOpacity style={styles.loginButton} onPress={verifyOtp}>
                    <Text style={styles.loginButtonText}>Verify OTP</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.loginButton} onPress={sendOtp}>
                    <Text style={styles.loginButtonText}>Send OTP</Text>
                  </TouchableOpacity>

                  {/* Google & Facebook Login (Hidden after OTP is sent) */}
                  {!verificationId && (
                    <View style={styles.socialContainer}>
                      <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()} disabled={!request}>
                        <FontAwesome name="google" size={24} color="#e45ba5" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={24} color="#e45ba5" />
                      </TouchableOpacity>
                    </View>
                  )}

                  {/* Signup Link */}
                  <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                      <Text style={styles.signupLink}> Sign Up</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginHorizontal: 10,
    marginTop: '80%', // ✅ Moved down so it doesn't cover the image
  },
  backArrow: {
    position: 'absolute',
    bottom: 230,
    left: 10,
    zIndex: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d80165',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#e45ba5',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e45ba5',
  },
  signupContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#e45ba5',
    fontSize: 14,
  },
  signupLink: {
    color: '#e45ba5',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;