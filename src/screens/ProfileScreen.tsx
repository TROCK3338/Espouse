import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Share,
  Switch,
  SafeAreaView,
  Platform,
  Dimensions,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the RootStackParamList type for navigation
type RootStackParamList = {
  Home: undefined;
  PhysicalActivity: undefined;
  Statistics: undefined;
  Appointments: undefined;
  Medications: undefined;
  PersonalInformation: undefined;
  Community: undefined;
  Settings: undefined;
  EditProfile: {
    userName: string;
    userCountry: string;
    onSave: (newName: string, newCountry: string) => void;
  };
};

// Define health stats type
interface HealthStats {
  startWeight: string;
  goalWeight: string;
  calories: string;
}

// Define list item type
interface ListItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  subtitle: string;
  color: string;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 3;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  // State for user profile and settings
  const [userName, setUserName] = useState<string>('Sarah Johnson');
  const [userCountry, setUserCountry] = useState<string>('California, USA');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCoupleSharing, setIsCoupleSharing] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [healthStats, setHealthStats] = useState<HealthStats>({
    startWeight: '68.5',
    goalWeight: '64.0',
    calories: '182'
  });
  
  // Load user data on initial render and when screen is focused
  const loadUserData = useCallback(async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedCountry = await AsyncStorage.getItem('userCountry');
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      const storedCoupleSharing = await AsyncStorage.getItem('coupleSharing');
      const storedHealthStats = await AsyncStorage.getItem('healthStats');

      if (storedName) setUserName(storedName);
      if (storedCountry) setUserCountry(storedCountry);
      setIsDarkMode(storedDarkMode === 'true');
      setIsCoupleSharing(storedCoupleSharing === 'true');
      if (storedHealthStats) {
        const parsed = JSON.parse(storedHealthStats);
        setHealthStats(parsed as HealthStats);
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }, []);

  // Reload data when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );
  
  // Initial load
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUserData();
    setTimeout(() => setRefreshing(false), 1000);
  }, [loadUserData]);

  // Save setting
  const saveSetting = async (key: string, value: string | object): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}`, error);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = useCallback(async (value: boolean) => {
    setIsDarkMode(value);
    await saveSetting('darkMode', value.toString());
  }, []);

  // Toggle couple sharing
  const toggleCoupleSharing = useCallback(async (value: boolean) => {
    setIsCoupleSharing(value);
    await saveSetting('coupleSharing', value.toString());
  }, []);

  // Share profile function
  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my IVF Journey profile! I'm ${userName} from ${userCountry}.`,
        title: 'IVF Journey Profile'
      });
    } catch (error) {
      console.error('Error sharing profile', error);
    }
  };

  // Edit profile
  const editProfile = () => {
    navigation.navigate('EditProfile', {
      userName,
      userCountry,
      onSave: (newName: string, newCountry: string) => {
        setUserName(newName);
        setUserCountry(newCountry);
        saveSetting('userName', newName);
        saveSetting('userCountry', newCountry);
      }
    });
  };

  // Handle list item navigation
  const handleListItemPress = (title: string) => {
    const screenName = title.replace(/\s+/g, '') as keyof RootStackParamList;
    navigation.navigate(screenName);
  };

  // List items data
  const listItems: ListItem[] = [
    { 
      title: 'Physical Activity', 
      icon: 'pulse-outline', 
      subtitle: 'Last activity: 2 days ago',
      color: '#4CAF50' 
    },
    { 
      title: 'Statistics', 
      icon: 'stats-chart-outline', 
      subtitle: 'Cycle length: 28 days',
      color: '#2196F3' 
    },
    { 
      title: 'Appointments', 
      icon: 'calendar-outline', 
      subtitle: 'Next: March 15, 09:30 AM',
      color: '#9C27B0' 
    },
    { 
      title: 'Medications', 
      icon: 'medical-outline', 
      subtitle: '4 active prescriptions',
      color: '#F44336' 
    },
    { 
      title: 'Personal Information', 
      icon: 'person-outline', 
      subtitle: 'Age: 34, BMI: 24.5',
      color: '#FF9800' 
    },
    { 
      title: 'Community', 
      icon: 'people-outline', 
      subtitle: 'Connect with others',
      color: '#00BCD4' 
    }
  ];

  // Dynamic styles based on dark mode
  const theme = {
    background: isDarkMode ? '#121212' : '#FFFFFF',
    surface: isDarkMode ? '#1E1E1E' : '#F8F9FA',
    primary: '#6200EE',
    accent: '#03DAC6',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    card: {
      activity: isDarkMode ? '#2D1E4A' : '#E8F5E9',
      stats: isDarkMode ? '#1E3B4A' : '#E0F7FA',
      calories: isDarkMode ? '#4A3A1E' : '#FFF8E1'
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={theme.text} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons 
            name="settings-outline" 
            size={24} 
            color={theme.text} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: theme.background }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
      >
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editPhotoButton}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>{userName}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.profileLocation, { color: theme.textSecondary }]}>{userCountry}</Text>
            </View>
            
            {/* Profile action buttons - moved below name and location */}
            <View style={styles.profileActions}>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.primary + '20' }]} 
                onPress={shareProfile}
              >
                <Ionicons name="share-social-outline" size={18} color={theme.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: theme.primary + '20', marginLeft: 12 }]}
                onPress={editProfile}
              >
                <Ionicons name="pencil-outline" size={18} color={theme.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Health Stats Cards */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 20, marginTop: 20 }]}>
          Health Stats
        </Text>
        <View style={styles.healthStatsContainer}>
          <View style={[styles.healthCard, { backgroundColor: theme.card.activity }]}>
            <Text style={[styles.healthCardLabel, { color: theme.textSecondary }]}>Start weight</Text>
            <Text style={[styles.healthCardValue, { color: theme.text }]}>
              {healthStats.startWeight}<Text style={styles.healthCardUnit}>kg</Text>
            </Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: theme.card.stats }]}>
            <Text style={[styles.healthCardLabel, { color: theme.textSecondary }]}>Goal</Text>
            <Text style={[styles.healthCardValue, { color: theme.text }]}>
              {healthStats.goalWeight}<Text style={styles.healthCardUnit}>kg</Text>
            </Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: theme.card.calories }]}>
            <Text style={[styles.healthCardLabel, { color: theme.textSecondary }]}>Calories</Text>
            <Text style={[styles.healthCardValue, { color: theme.text }]}>
              {healthStats.calories}<Text style={styles.healthCardUnit}> kcal</Text>
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 20, marginTop: 10 }]}>
          Settings
        </Text>
        
        {/* Dark Mode Toggle */}
        <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
          <View style={styles.settingInfo}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primary + '20' }]}>
              <Ionicons 
                name={isDarkMode ? "moon" : "sunny"} 
                size={20} 
                color={theme.primary}
              />
            </View>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: "#767577", true: theme.primary + '80' }}
            thumbColor={isDarkMode ? theme.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {/* Couple Sharing Toggle */}
        <View style={[styles.settingItem, { borderBottomColor: theme.border }]}>
          <View style={styles.settingInfo}>
            <View style={[styles.settingIconContainer, { backgroundColor: theme.primary + '20' }]}>
              <Ionicons 
                name="people-outline" 
                size={20} 
                color={theme.primary}
              />
            </View>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Couple Sharing</Text>
          </View>
          <Switch
            value={isCoupleSharing}
            onValueChange={toggleCoupleSharing}
            trackColor={{ false: "#767577", true: theme.primary + '80' }}
            thumbColor={isCoupleSharing ? theme.primary : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
          />
        </View>

        {/* Features Section */}
        <Text style={[styles.sectionTitle, { color: theme.text, marginLeft: 20, marginTop: 20 }]}>
          Features
        </Text>
        
        {/* List items with enhanced styling */}
        <View style={styles.listContainer}>
          {listItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.listItem, 
                { borderBottomColor: theme.border }
              ]}
              onPress={() => handleListItemPress(item.title)}
              activeOpacity={0.7}
            >
              <View 
                style={[
                  styles.listIconContainer, 
                  { backgroundColor: isDarkMode ? item.color + '20' : item.color + '10' }
                ]}
              >
                <Ionicons 
                  name={item.icon} 
                  size={22} 
                  color={item.color} 
                />
              </View>
              <View style={styles.listContent}>
                <Text style={[styles.listTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.listSubtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={22} 
                color={theme.textSecondary} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
            IVF Journey v1.0.0
          </Text>
        </View>

        {/* Bottom spacing for navigation bar */}
        <View style={styles.navigationBarSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 8,
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6200EE',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16, // Added space above the action buttons
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLocation: {
    fontSize: 14,
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  healthStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  healthCard: {
    borderRadius: 16,
    padding: 15,
    width: cardWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  healthCardLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  healthCardValue: {
    fontSize: 22,
    fontWeight: '600',
  },
  healthCardUnit: {
    fontSize: 14,
    fontWeight: '400',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  listIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  appVersion: {
    fontSize: 14,
  },
  navigationBarSpace: {
    height: 80,
  },
});

export default ProfileScreen;