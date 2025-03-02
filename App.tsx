import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Image, LogBox } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import TreatmentScreen from './screens/TreatmentScreen';
import ProfileScreen from './screens/ProfileScreen';
import BlogDetailScreen from './screens/BlogDetailScreen';
import BlogsCarousel from './screens/BlogsCarousel';
import NavigationBar from './screens/NavigationBar';

// ✅ Ignore FirebaseRecaptcha warning
LogBox.ignoreLogs(['FirebaseRecaptcha: Support for defaultProps will be removed']);

// ✅ Define navigation types
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainTabs: undefined;
  BlogDetail: { blog: { id: string; title: string; subtitle: string; image: any } }; // ✅ Fix
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="BlogDetail" component={BlogDetailScreen} options={{ title: 'Blog Detail' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

// ✅ Main Tabs with Navigation Bar
const MainTabs = () => {
  const [activeTab, setActiveTab] = useState('HOME');

  const renderScreen = () => {
    switch (activeTab) {
      case 'HOME':
        return <HomeScreen />;
      case 'BLOGS':
        return <BlogsCarousel />;
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

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    console.log(`Switched to ${tab}`);
  };

  return (
    <View style={{ flex: 1 }}>
      {renderScreen()}
      <NavigationBar onTabPress={handleTabPress} />
    </View>
  );
};

// ✅ Welcome Screen
const WelcomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Welcome'>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TouchableOpacity style={styles.welcomeContainer} onPress={() => navigation.replace('Login')}>
      <Image source={require('./assets/tempLogo.png')} style={styles.logo} />
      <Text style={styles.appName}>Espouse</Text>
      <Text style={styles.tagline}>Bridging Hope with Science: Your IVF Journey, Simplified.</Text>
    </TouchableOpacity>
  );
};

// ✅ Styles
const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  appName: {
    fontSize: 32,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7A7A7A',
    position: 'absolute',
    bottom: 40,
    width: '80%',
  },
});

export default App;