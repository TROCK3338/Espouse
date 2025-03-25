import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, PhoneAuthProvider, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC37bVaqVzMKPq9Y2lhgxKdQ_qcT3yZh0k",
  authDomain: "espouse-b7ef8.firebaseapp.com",
  projectId: "espouse-b7ef8",
  storageBucket: "espouse-b7ef8.appspot.com",
  messagingSenderId: "1002497853400",
  appId: "1:1002497853400:web:98bd13211b9d782fe5d4ad",
  databaseURL: "https://espouse-b7ef8.firebaseio.com" // ✅ Keep this

};

// ✅ Initialize Firebase
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
          
          // Set login state
          await AsyncStorage.setItem('isLoggedIn', 'true');
  
          // ✅ Check if user has already completed profile setup
          const name = await AsyncStorage.getItem('userName');
          const country = await AsyncStorage.getItem('userCountry');
          const role = await AsyncStorage.getItem('userRole');
  
          if (name && country && role) {
            navigation.replace('MainTabs'); // ✅ Go to MainTabs if profile is complete
          } else {
            navigation.replace('ProfileSetup'); // ✅ Otherwise, go to ProfileSetup
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

  // ✅ Verify OTP - Updated to check profile completion
  const verifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      
      // Set login state
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      // Check if profile is complete
      const name = await AsyncStorage.getItem('userName');
      const country = await AsyncStorage.getItem('userCountry');
      const role = await AsyncStorage.getItem('userRole');
      
      Alert.alert('Success', 'Phone verified!');
      
      if (name && country && role) {
        navigation.replace('MainTabs'); // Go to MainTabs if profile is complete
      } else {
        navigation.replace('ProfileSetup'); // Otherwise, go to ProfileSetup
      }
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />

      {/* Welcome Back Section */}
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Sign into your account</Text>

      {/* Phone Number Input */}
      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.loginButton} onPress={sendOtp}>
        <Text style={styles.loginButtonText}>Send OTP</Text>
      </TouchableOpacity>

      {/* OTP Input */}
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
      ) : null}

      {/* Google Login Button */}
      <TouchableOpacity style={[styles.loginButton, styles.googleButton]} onPress={() => promptAsync()} disabled={!request}>
        <Text style={[styles.loginButtonText, styles.googleText]}>Login with Google</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup', { firebaseConfig })}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ✅ Styles (Subtle & Aesthetic)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F4FF', // Soft pastel background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e45ba5', // peachish
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d80165', //Dark Pink
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#e45ba5', //peachish
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
  googleButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#d80165', //Dark Pink
  },
  googleText: {
    color: '#e45ba5', //peachish
  },
  signupContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#e45ba5', //peachish
    fontSize: 14,
  },
  signupLink: {
    color: '#e45ba5', //peachish
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LoginScreen;