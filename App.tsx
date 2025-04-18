import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import TreatmentScreen from './src/screens/TreatmentScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NavigationBar from './src/screens/NavigationBar';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import { LogBox } from 'react-native';

// ✅ Ignore FirebaseRecaptcha warning
LogBox.ignoreLogs(['FirebaseRecaptcha: Support for defaultProps will be removed']);

export type RootStackParamList = {
  Branding: undefined;
  Login: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    const checkProfileSetup = async () => {
      if (__DEV__) {
        // ✅ Auto-clear AsyncStorage in development for testing
        await AsyncStorage.clear();
      }

      const name = await AsyncStorage.getItem('userName');
      const country = await AsyncStorage.getItem('userCountry');
      const role = await AsyncStorage.getItem('userRole');

      if (name && country && role) {
        setIsProfileComplete(true);
      } else {
        setIsProfileComplete(false);
      }
    };

    checkProfileSetup();
  }, []);

  if (isProfileComplete === null) return null; // Prevents flashing before check completes

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Branding" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Branding" component={BrandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// ✅ Branding Screen 
const BrandingScreen = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.brandingContainer}>
      <Image source={require('./assets/branding.png')} style={styles.logo} />
      <Text style={styles.tagline}>Bridging Hope with Science: Your IVF Journey, Simplified.</Text>
    </View>
  );
};

// ✅ Main Tabs with Navigation Bar
const MainTabs = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const renderScreen = () => {
    switch (activeTab) {
      case 'HOME':
        return <HomeScreen />;
      case 'CHAT':
        return <ChatScreen />;
      case 'TREAT':
        return <TreatmentScreen />;
      case 'PROFILE':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <NavigationBar onTabPress={setActiveTab} />
    </View>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  brandingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 400,
    height: 400,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7A7A7A',
    position: 'absolute',
    bottom: 40,
    width: '80%',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF5252',
    borderRadius: 5,
  },
  resetText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default App;