import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, Easing, Dimensions, ScrollView, StatusBar } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { useGLTF } from '@react-three/drei';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Svg, Path, Circle, LinearGradient, Stop, Defs } from 'react-native-svg';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;
const { width } = Dimensions.get('window');

interface RoleData {
  id: string;
  title: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  modelPath: any;
  tagline: string;
}

// Enhanced role card data with professional information
const roleData: RoleData[] = [
  { 
    id: 'Wellness Seeker',
    title: 'Wellness Seeker', 
    description: 'Looking for information and support on my wellness journey',
    primaryColor: '#11998e',
    secondaryColor: '#38ef7d',
    modelPath: require('../assets/wellness-seeker.png'),
    tagline: "Your journey to wellness starts here"
  },
  { 
    id: 'Gynaecologist',
    title: 'Gynaecologist', 
    description: 'I specialize in women\'s reproductive health and wellness',
    primaryColor: '#FF416C',
    secondaryColor: '#FF4B2B',
    modelPath: require('../assets/gynaecologist.png'),
    tagline: "Supporting women's health with expertise and compassion"
  },
  { 
    id: 'Embryologist',
    title: 'Embryologist', 
    description: 'I work with embryos and advanced reproductive technology',
    primaryColor: '#7F7FD5',
    secondaryColor: '#91EAE4',
    modelPath: require('../assets/embryologist.png'),
    tagline: "Advancing the science of reproductive technology"
  },
];

// Common countries list for the country picker
const commonCountries: string[] = [
  "United States", "Canada", "United Kingdom", "Australia", 
  "Germany", "France", "India", "Japan", "China", "Brazil",
  "Spain", "Italy", "South Korea", "Russia", "Mexico",
  "South Africa", "Netherlands", "Sweden", "Singapore", "New Zealand"
];

interface ModelRendererProps {
  modelPath: any;
  primaryColor: string;
  role: string;
  rotationSpeed?: number;
}

// 3D model renderer component (simplified for code example)
const ThreeDModelRenderer: React.FC<ModelRendererProps> = ({ 
  primaryColor, 
  role, 
  rotationSpeed = 0.01 
}) => {
  const [rotation, setRotation] = useState<number>(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + rotationSpeed);
    }, 16);
    
    return () => clearInterval(interval);
  }, [rotationSpeed]);
  
  const renderRoleSpecificModel = () => {
    switch(role) {
      case 'Wellness Seeker':
        return (
          <Svg height="200" width="200" viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="wellness-grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
                <Stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
            {/* Stylized human figure with wellness elements */}
            <Path 
              d={`M 50 20 
                  Q ${50 + Math.sin(rotation) * 5} ${30 + Math.cos(rotation) * 3} 45 40
                  Q 50 50 55 40
                  Q ${50 - Math.sin(rotation) * 5} ${30 - Math.cos(rotation) * 3} 50 20`} 
              fill={primaryColor} 
              opacity="0.7"
            />
            <Circle 
              cx="50" 
              cy="35" 
              r="10" 
              fill="url(#wellness-grad)" 
              transform={`rotate(${rotation * 30}, 50, 35)`}
            />
            <Path 
              d="M 45 50 L 55 50 L 52 70 L 48 70 Z" 
              fill={primaryColor} 
              opacity="0.5"
            />
            <Path 
              d="M 40 70 L 60 70 L 58 80 L 42 80 Z" 
              fill={primaryColor} 
              opacity="0.3"
            />
          </Svg>
        );
      
      case 'Gynaecologist':
        return (
          <Svg height="200" width="200" viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="doc-grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
                <Stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
            {/* Stethoscope and medical cross */}
            <Path 
              d={`M 50 30 
                  Q ${50 + Math.sin(rotation) * 3} ${40 + Math.cos(rotation) * 3} 40 50
                  Q 50 60 60 50
                  Q ${50 - Math.sin(rotation) * 3} ${40 - Math.cos(rotation) * 3} 50 30`} 
              fill={primaryColor} 
              opacity="0.7"
            />
            <Path 
              d="M 45 60 L 55 60 L 55 70 L 45 70 Z" 
              fill={primaryColor} 
              opacity="0.5"
            />
            <Path 
              d="M 50 55 L 50 45 M 45 50 L 55 50" 
              stroke={primaryColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <Circle 
              cx="50" 
              cy="35" 
              r="10" 
              fill="url(#doc-grad)" 
              transform={`rotate(${rotation * 30}, 50, 35)`}
            />
          </Svg>
        );
      
      case 'Embryologist':
        return (
          <Svg height="200" width="200" viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id="embryo-grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={primaryColor} stopOpacity="1" />
                <Stop offset="1" stopColor="#ffffff" stopOpacity="0.5" />
              </LinearGradient>
            </Defs>
            {/* Stylized embryo/cell representation */}
            <Path 
              d={`M 50 40 
                  Q ${50 + Math.sin(rotation) * 5} ${45 + Math.cos(rotation) * 5} 40 50
                  Q 50 60 60 50
                  Q ${50 - Math.sin(rotation) * 5} ${45 - Math.cos(rotation) * 5} 50 40`} 
              fill={primaryColor} 
              opacity="0.7"
            />
            <Circle 
              cx="50" 
              cy="50" 
              r="15" 
              fill="url(#embryo-grad)" 
              transform={`rotate(${rotation * 30}, 50, 50)`}
            />
            <Circle 
              cx="50" 
              cy="50" 
              r="7" 
              fill={primaryColor}
              opacity="0.5"
            />
            <Path 
              d="M 45 65 L 55 65 L 53 75 L 47 75 Z" 
              fill={primaryColor} 
              opacity="0.3"
            />
          </Svg>
        );
      
      default:
        return (
          <Svg height="200" width="200" viewBox="0 0 100 100">
            <Circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill={primaryColor}
              opacity="0.5"
            />
          </Svg>
        );
    }
  };
  
  return (
    <View style={{
      width: 80,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    }}>
      {renderRoleSpecificModel()}
    </View>
  );
};

const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showCountrySelector, setShowCountrySelector] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [firstNameIsActive, setFirstNameIsActive] = useState(firstName.length > 0);
  const [lastNameIsActive, setLastNameIsActive] = useState(lastName.length > 0);
  
  // Progress animation
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Page transition animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Keyboard animation
  const keyboardAnim = useRef(new Animated.Value(0)).current;
  
  // Floating label animations for inputs
  const firstNameLabelAnim = useRef(new Animated.Value(firstName ? 1 : 0)).current;
  const lastNameLabelAnim = useRef(new Animated.Value(lastName ? 1 : 0)).current;
  
  // Role selection animations
  const roleScaleAnims = useRef<Animated.Value[]>(roleData.map(() => new Animated.Value(0.9))).current;
  const roleOpacityAnims = useRef<Animated.Value[]>(roleData.map(() => new Animated.Value(0.6))).current;
  
  // Update progress bar based on active step
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (activeStep + 1) / 3,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [activeStep, progressAnim]);
  
  // Floating label animation handlers
  const handleFocusInput = (labelAnim: Animated.Value, value: string) => {
    Animated.timing(labelAnim, {
      toValue: value.length > 0 ? 1 : 0.7,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  
  const handleBlurInput = (labelAnim: Animated.Value, value: string) => {
    Animated.timing(labelAnim, {
      toValue: value.length > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  
  const handleFocusFirstName = () => {
    setFirstNameIsActive(true);
    handleFocusInput(firstNameLabelAnim, firstName);
  };

  const handleBlurFirstName = () => {
    setFirstNameIsActive(firstName.length > 0);
    handleBlurInput(firstNameLabelAnim, firstName);
  };

  const handleFocusLastName = () => {
    setLastNameIsActive(true);
    handleFocusInput(lastNameLabelAnim, lastName);
  };

  const handleBlurLastName = () => {
    setLastNameIsActive(lastName.length > 0);
    handleBlurInput(lastNameLabelAnim, lastName);
  };
  
  // Role selection handler
  const handleSelectRole = (roleId: string, index: number) => {
    setRole(roleId);
    
    // Animate all roles
    roleData.forEach((_, i) => {
      Animated.parallel([
        Animated.spring(roleScaleAnims[i], {
          toValue: i === index ? 1 : 0.9,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(roleOpacityAnims[i], {
          toValue: i === index ? 1 : 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };
  
  // Country search filter
  const filteredCountries = searchQuery.length > 0 
    ? commonCountries.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    : commonCountries;
  
  // Toggle country selector
  const toggleCountrySelector = () => {
    setShowCountrySelector(!showCountrySelector);
    setSearchQuery('');
  };
  
  // Select a country
  const selectCountry = (selected: string) => {
    setCountry(selected);
    setShowCountrySelector(false);
  };
  
  // Slide between steps with smooth animation
  const slideToNext = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -width * 0.25,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveStep(activeStep + 1);
      slideAnim.setValue(width * 0.25);
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };
  
  // Validation and navigation to next step
  const nextStep = () => {
    if (activeStep === 0 && (!firstName || !lastName)) {
      Alert.alert('Please Complete', 'Enter your first and last name to continue');
      return;
    }
    
    if (activeStep === 1 && !country) {
      Alert.alert('Please Select', 'Choose your country to continue');
      return;
    }
    
    if (activeStep === 2 && !role) {
      Alert.alert('Please Select', 'Select your role to continue');
      return;
    }
    
    if (activeStep === 2) {
      saveProfile();
      return;
    }
    
    slideToNext();
  };
  
  // Previous step handler
  const prevStep = () => {
    if (activeStep === 0) return;
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: width * 0.25,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setActiveStep(activeStep - 1);
      slideAnim.setValue(-width * 0.25);
      
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };
  
  // Save profile data and navigate to main app
  const saveProfile = async () => {
    try {
      const fullName = `${firstName} ${lastName}`;
      await AsyncStorage.setItem('userName', fullName);
      await AsyncStorage.setItem('userFirstName', firstName);
      await AsyncStorage.setItem('userLastName', lastName);
      await AsyncStorage.setItem('userCountry', country);
      await AsyncStorage.setItem('userRole', role);
      
      // Success animation before navigating
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.delay(400)
      ]).start(() => {
        navigation.replace('MainTabs');
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile data. Please try again.');
    }
  };
  
  // Render name input screen
  const renderNameInput = () => {
    return (
      <Animated.View 
        style={[
          styles.stepContent,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.topSection}>
          <Text style={styles.stepTitle}>What's your name?</Text>
          <Text style={styles.stepDescription}>
            We'll use this to personalize your experience
          </Text>
        </View>
        
        <View style={styles.inputsContainer}>
          <View style={styles.inputGroup}>
            <Animated.Text 
              style={[
                styles.floatingLabel, 
                {
                  transform: [
                    { 
                      translateY: firstNameLabelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      })
                    }
                  ],
                  opacity: firstNameLabelAnim,
                  fontSize: firstNameLabelAnim.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [14, 12, 12]
                  })
                }
              ]}
            >
              First Name
            </Animated.Text>
            <TextInput
              style={styles.textInput}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (text.length > 0 && !firstNameIsActive) {
                  setFirstNameIsActive(true);
                }
              }}
              placeholder={firstNameIsActive ? "" : "First Name"}
              placeholderTextColor="rgba(100,100,100,0.6)"
              onFocus={handleFocusFirstName}
              onBlur={handleBlurFirstName}
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Animated.Text 
              style={[
                styles.floatingLabel,
                {
                  transform: [
                    { 
                      translateY: lastNameLabelAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      })
                    }
                  ],
                  opacity: lastNameLabelAnim,
                  fontSize: lastNameLabelAnim.interpolate({
                    inputRange: [0, 0.7, 1],
                    outputRange: [14, 12, 12]
                  })
                }
              ]}
            >
              Last Name
            </Animated.Text>
            <TextInput
              style={styles.textInput}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (text.length > 0 && !lastNameIsActive) {
                  setLastNameIsActive(true);
                }
              }}
              placeholder={lastNameIsActive ? "" : "Last Name"}
              placeholderTextColor="rgba(100,100,100,0.6)"
              onFocus={handleFocusLastName}
              onBlur={handleBlurLastName}
            />
          </View>
        </View>
      </Animated.View>
    );
  };
  
  // Render country selection screen
  const renderCountrySelection = () => {
    return (
      <Animated.View 
        style={[
          styles.stepContent,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.topSection}>
          <Text style={styles.stepTitle}>Where are you from?</Text>
          <Text style={styles.stepDescription}>
            Help us provide location-specific resources
          </Text>
        </View>
        
        <View style={styles.countrySelectContainer}>
          <TouchableOpacity
            style={[
              styles.countrySelector,
              country ? styles.countrySelectorActive : {}
            ]}
            onPress={toggleCountrySelector}
            activeOpacity={0.7}
          >
            <View style={styles.countrySelectorContent}>
              <Text 
                style={[
                  styles.countrySelectorText,
                  country ? styles.countrySelectorTextActive : {}
                ]}
              >
                {country || "Select Your Country"}
              </Text>
              
              <Svg height="16" width="16" viewBox="0 0 24 24">
                <Path 
                  d={showCountrySelector ? 
                    "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" : 
                    "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}
                  fill="#5A4FCF"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          
          {showCountrySelector && (
            <View style={styles.countryListContainer}>
              <View style={styles.searchContainer}>
                <Svg height="20" width="20" viewBox="0 0 24 24" style={styles.searchIcon}>
                  <Path 
                    d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    fill="#999"
                  />
                </Svg>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search countries..."
                  placeholderTextColor="rgba(100,100,100,0.6)"
                />
              </View>
              
              <ScrollView 
                style={styles.countryList}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {filteredCountries.map((countryName, index) => (
                  <TouchableOpacity
                    key={countryName}
                    style={[
                      styles.countryItem,
                      country === countryName && styles.countryItemActive
                    ]}
                    onPress={() => selectCountry(countryName)}
                  >
                    <Text 
                      style={[
                        styles.countryItemText,
                        country === countryName && styles.countryItemTextActive
                      ]}
                    >
                      {countryName}
                    </Text>
                    
                    {country === countryName && (
                      <Svg height="24" width="24" viewBox="0 0 24 24">
                        <Path 
                          d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          fill="#5A4FCF"
                        />
                      </Svg>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };
  
  // Render role selection screen
  const renderRoleSelection = () => {
    return (
      <Animated.View 
        style={[
          styles.stepContent,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <View style={styles.topSection}>
          <Text style={styles.stepTitle}>Select Your Role</Text>
          <Text style={styles.stepDescription}>
            Choose the option that best represents you
          </Text>
        </View>
        
        <ScrollView 
          style={styles.rolesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.rolesContentContainer}
        >
 {roleData.map((roleItem, index) => (
          <TouchableOpacity
            key={roleItem.id}
            onPress={() => handleSelectRole(roleItem.id, index)}
            activeOpacity={0.9}
          >
            <Animated.View 
              style={[
                styles.roleCard,
                {
                // Keep the border consistent width, just change color and opacity
                borderWidth: 2,
                borderColor: role === roleItem.id 
                ? roleItem.primaryColor 
                : 'rgba(0,0,0,0.1)', // Very subtle border when not selected
                transform: [{ scale: roleScaleAnims[index] }],
                opacity: roleOpacityAnims[index],
                }
            ]}
            >
                <ThreeDModelRenderer 
                  modelPath={roleItem.modelPath}
                  primaryColor={roleItem.primaryColor}
                  role={roleItem.title}
                />
                
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>{roleItem.title}</Text>
                  <Text style={styles.roleDescription}>{roleItem.description}</Text>
                </View>
                
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };
  
  // Render active step content
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderNameInput();
      case 1:
        return renderCountrySelection();
      case 2:
        return renderRoleSelection();
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        />
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        {activeStep > 0 && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={prevStep}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Svg height="24" width="24" viewBox="0 0 24 24">
              <Path 
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                fill="#5A4FCF"
              />
            </Svg>
          </TouchableOpacity>
        )}
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Create Your Profile</Text>
          <Text style={styles.headerSubtitle}>
            Step {activeStep + 1} of 3
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => {
            Alert.alert(
              'Skip Setup?',
              'You can complete your profile later from settings.',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Skip', onPress: () => navigation.replace('MainTabs') }
              ]
            );
          }}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {renderStepContent()}
      </View>
      
      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={nextStep}
          activeOpacity={0.8}
        >
          <Text style={styles.actionButtonText}>
            {activeStep === 2 ? 'Complete Profile' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  progressContainer: {
    height: 4,
    width: '100%',
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5A4FCF',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 5,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  skipButton: {
    padding: 5,
  },
  skipText: {
    fontSize: 14,
    color: '#5A4FCF',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  stepContent: {
    flex: 1,
  },
  topSection: {
    marginBottom: 15,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
  },
  inputsContainer: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 25,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    left: 2,
    top: -20,
    color: '#5A4FCF',
    fontSize: 12,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 2,
    color: '#333',
  },
  countrySelectContainer: {
    marginTop: 20,
  },
  countrySelector: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  countrySelectorActive: {
    borderColor: '#5A4FCF',
    backgroundColor: 'rgba(90, 79, 207, 0.05)',
  },
  countrySelectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countrySelectorText: {
    fontSize: 18,
    color: '#999',
  },
  countrySelectorTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  countryListContainer: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    maxHeight: 300,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  countryList: {
    maxHeight: 250,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryItemActive: {
    backgroundColor: 'rgba(90, 79, 207, 0.05)',
  },
  countryItemText: {
    fontSize: 16,
    color: '#333',
  },
  countryItemTextActive: {
    color: '#5A4FCF',
    fontWeight: '600',
  },
  
  rolesContainer: {
    flex: 1,
    padding: 5,
    width: '100%',
  },
  rolesContentContainer: {
    paddingBottom: 20,
    // width: '100%',
  },
  roleCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.1)', // Default very light border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  modelContainer: {
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5A4FCF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomActions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  actionButton: {
    backgroundColor: '#5A4FCF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5A4FCF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileSetupScreen;