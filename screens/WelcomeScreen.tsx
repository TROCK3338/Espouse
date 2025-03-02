import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  const logoScale = useRef(new Animated.Value(1)).current; // Initial scale is 1

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 3, // Enlarges the logo 3x
      duration: 1200, // 1.2 seconds animation
      useNativeDriver: true,
    }).start(() => {
      navigation.replace('Login'); // Switch to Login screen after animation
    });
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.replace('Login')}>
      <Animated.Image
        source={require('../assets/espouse-logo.png')}
        style={[styles.logo, { transform: [{ scale: logoScale }] }]}
      />
      <Text style={styles.appName}>Espouse</Text>
      <Text style={styles.tagline}>Bridging Hope with Science: Your IVF Journey, Simplified.</Text>
    </TouchableOpacity>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
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