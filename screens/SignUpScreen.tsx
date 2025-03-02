import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Define navigation types
type RootStackParamList = {
  Signup: { phoneNumber?: string; firebaseConfig?: any };
  MainTabs: undefined;
};

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation, route }) => {
  // Form state
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [phone, setPhone] = useState<string>(route.params?.phoneNumber || '');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Firebase references
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  // Image picker function
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'You need to allow access to your photos to upload a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Upload image to Firebase Storage
  const uploadProfileImage = async (uid: string): Promise<string | null> => {
    if (!profileImage) return null;

    try {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const fileRef = ref(storage, `profileImages/${uid}`);
      await uploadBytes(fileRef, blob);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.log('Error uploading image:', error);
      return null;
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (phone && !phoneRegex.test(phone)) {
      Alert.alert('Error', 'Please enter a valid phone number with country code');
      return false;
    }

    return true;
  };

  // Handle signup
  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile image if selected
      const photoURL = await uploadProfileImage(user.uid);

      // Update user profile
      await updateProfile(user, {
        displayName: fullName,
        photoURL: photoURL || '',
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        email,
        phone: phone || '',
        photoURL: photoURL || '',
        createdAt: new Date().toISOString(),
      });

      // Navigate to home screen
      setLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('MainTabs'),
        },
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={route.params?.firebaseConfig} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Please fill in the details below</Text>
        </View>

        {/* Profile Image Picker */}
        <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <TextInput placeholder="Full Name" style={styles.input} value={fullName} onChangeText={setFullName} />
          <TextInput placeholder="Email Address" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
          <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          <TextInput placeholder="Phone Number (with country code)" style={styles.input} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

          {/* Signup Button */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.signupButtonText}>Create Account</Text>}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity style={styles.backToLoginContainer} onPress={() => navigation.goBack()}>
            <Text style={styles.backToLoginText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    header: {
      alignItems: 'center',
      marginVertical: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
    },
    imagePickerContainer: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    imagePlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagePlaceholderText: {
      color: '#888',
      fontSize: 12,
    },
    formContainer: {
      marginBottom: 20,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 15,
    },
    signupButton: {
      backgroundColor: '#007AFF',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    signupButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    backToLoginContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    backToLoginText: {
      fontSize: 14,
      color: '#666',
    },
    loginLink: {
      color: '#007AFF',
      fontWeight: 'bold',
    },
  });

export default SignupScreen;