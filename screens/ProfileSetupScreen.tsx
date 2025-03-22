import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Animated,
  Easing,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;
const { width } = Dimensions.get('window');

// Role card data with icons (you'd need to import actual icons)
const roleData = [
  { 
    id: 'Gynecologist',
    title: 'Gynecologist', 
    description: 'I specialize in womens reproductive health',
    gradientColors: ['#FF6B6B', '#FF8787'],
    iconName: 'doctor'
  },
  { 
    id: 'Embryologist',
    title: 'Embryologist', 
    description: 'I work with embryos and reproductive technology',
    gradientColors: ['#4158D0', '#C850C0'],
    iconName: 'microscope'
  },
  { 
    id: 'Wellness Seeker',
    title: 'Wellness Seeker', 
    description: 'I am looking for information and support',
    gradientColors: ['#43E97B', '#38F9D7'],
    iconName: 'heart'
  },
];

const ProfileSetupScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  // Animation values
  const cardRotate = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Card flip animation
  const flipCard = (selectedRole: string) => {
    setRole(selectedRole);
    Animated.sequence([
      Animated.timing(cardRotate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear
      }),
      Animated.timing(cardRotate, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ]).start(() => {
      // Move to next step after animation completes
      setTimeout(() => {
        nextStep();
      }, 500);
    });
  };

  // Slide between steps
  const slideToNext = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start(() => {
      setActiveStep(activeStep + 1);
      slideAnim.setValue(width);
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  const nextStep = () => {
    if (activeStep === 0 && !name) {
      Alert.alert('Name Required', 'Please enter your name to continue');
      return;
    }
    
    if (activeStep === 1 && !country) {
      Alert.alert('Country Required', 'Please enter your country to continue');
      return;
    }
    
    if (activeStep === 2 && !role) {
      // This shouldn't happen with the card selection
      return;
    }
    
    if (activeStep === 2) {
      saveProfile();
      return;
    }
    
    slideToNext();
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userCountry', country);
      await AsyncStorage.setItem('userRole', role);
      
      // Verify data was saved
      const updatedName = await AsyncStorage.getItem('userName');
      const updatedCountry = await AsyncStorage.getItem('userCountry');
      const updatedRole = await AsyncStorage.getItem('userRole');
      
      if (updatedName && updatedCountry && updatedRole) {
        // Success animation and navigate
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Error', 'Profile setup failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data.');
    }
  };

  // Interpolate rotation for card flip
  const frontRotate = cardRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  
  const backRotate = cardRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg']
  });

  // Render steps
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Animated.View 
            style={[
              styles.stepContainer, 
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <Text style={styles.stepTitle}>What's your name?</Text>
            <TextInput
              style={styles.inputModern}
              placeholder="Enter your full name"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={name}
              onChangeText={setName}
            />
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View 
            style={[
              styles.stepContainer, 
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <Text style={styles.stepTitle}>Where are you from?</Text>
            <TextInput
              style={styles.inputModern}
              placeholder="Enter your country"
              placeholderTextColor="rgba(255,255,255,0.6)"
              value={country}
              onChangeText={setCountry}
            />
            <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
              <Text style={styles.nextButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      case 2:
        return (
          <Animated.View 
            style={[
              styles.stepContainer, 
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }]
              }
            ]}
          >
            <Text style={styles.stepTitle}>I am a...</Text>
            <View style={styles.cardsContainer}>
              {roleData.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  onPress={() => flipCard(item.id)}
                  activeOpacity={0.9}
                >
                  <Animated.View 
                    style={[
                      styles.roleCard,
                      { 
                        transform: [{ rotateY: role === item.id ? frontRotate : '0deg' }],
                        // Add highlight for selected role
                        borderWidth: role === item.id ? 3 : 0,
                        borderColor: 'white',
                      }
                    ]}
                  >
                    <LinearGradient
                      colors={item.gradientColors}
                      style={styles.cardGradient}
                    >
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardDescription}>{item.description}</Text>
                    </LinearGradient>
                  </Animated.View>
                </TouchableOpacity>
              ))}
            </View>
            {role && (
              <TouchableOpacity 
                style={styles.finalizeButton} 
                onPress={saveProfile}
              >
                <Text style={styles.finalizeButtonText}>Complete Profile</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        );
      default:
        return null;
    }
  };

  // Progress indicator
  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        {[0, 1, 2].map((step) => (
          <View 
            key={step} 
            style={[
              styles.progressDot,
              activeStep >= step ? styles.progressActive : null
            ]} 
          />
        ))}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#5A4FCF', '#8776E5']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Create Your Profile</Text>
        {renderProgressIndicator()}
      </View>
      
      {renderStep()}
      
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => {
          Alert.alert(
            'Skip Setup?',
            'You can complete your profile later.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Skip', onPress: () => navigation.replace('MainTabs') }
            ]
          );
        }}
      >
        <Text style={styles.skipText}>Skip for now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 8,
  },
  progressActive: {
    backgroundColor: 'white',
    width: 30,
    borderRadius: 10,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputModern: {
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    paddingHorizontal: 25,
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  nextButton: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A4FCF',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  roleCard: {
    width: width - 60,
    height: 130,
    borderRadius: 20,
    marginBottom: 15,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  finalizeButton: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  finalizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5A4FCF',
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
  },
  skipText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
});

export default ProfileSetupScreen;