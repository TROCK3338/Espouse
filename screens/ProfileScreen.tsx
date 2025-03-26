import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, Share, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  // State for user profile and settings
  const [userName, setUserName] = useState('Sarah Johnson');
  const [userCountry, setUserCountry] = useState('California, USA');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCoupleSharing, setIsCoupleSharing] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedCountry = await AsyncStorage.getItem('userCountry');
        const storedDarkMode = await AsyncStorage.getItem('darkMode');
        const storedCoupleSharing = await AsyncStorage.getItem('coupleSharing');

        if (storedName) setUserName(storedName);
        if (storedCountry) setUserCountry(storedCountry);
        setIsDarkMode(storedDarkMode === 'true');
        setIsCoupleSharing(storedCoupleSharing === 'true');
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  // Share profile function
  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my IVF Journey profile! I'm ${userName} from ${userCountry}.`,
      });
    } catch (error) {
      console.error('Error sharing profile', error);
    }
  };

  // Navigation to edit profile
  const navigateToProfileSetup = () => {
    navigation.navigate('ProfileSetupScreen');
  };

  // Handle list item navigation
  const handleListItemPress = (title: string) => {
    switch(title) {
      case 'Physical activity':
        // Navigate to physical activity screen
        break;
      case 'Statistics':
        // Navigate to statistics screen
        break;
      case 'Appointments':
        // Navigate to appointments screen
        break;
      case 'Medications':
        // Navigate to medications screen
        break;
      case 'Personal Information':
        // Navigate to personal information screen
        break;
      case 'Community':
        // Navigate to community screen
        break;
      default:
        break;
    }
  };

  // Styles based on dark mode
  const getStyles = (isDark: boolean) => ({
    container: {
      backgroundColor: isDark ? '#121212' : '#FFF',
    },
    text: {
      color: isDark ? '#FFFFFF' : '#000000',
    },
    subtextColor: {
      color: isDark ? '#AAAAAA' : '#777777',
    },
    border: {
      borderBottomColor: isDark ? '#333333' : '#F0F0F0',
    }
  });

  const dynamicStyles = getStyles(isDarkMode);

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={isDarkMode ? "#121212" : "#fff"} 
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={isDarkMode ? "#FFF" : "#000"} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.text]}>Profile</Text>
        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => {/* Navigate to settings */}}
        >
          <Ionicons 
            name="settings-outline" 
            size={24} 
            color={isDarkMode ? "#FFF" : "#000"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: dynamicStyles.container.backgroundColor }}
      >
        {/* Profile Basic Info */}
        <View style={styles.profileBasic}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, dynamicStyles.text]}>{userName}</Text>
            <Text style={[styles.profileLocation, dynamicStyles.subtextColor]}>{userCountry}</Text>
          </View>
        </View>

        {/* Follow Stats (Replaced with Share and Edit) */}
        <View style={[styles.followStats, dynamicStyles.border]}>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={shareProfile}
          >
            <Ionicons 
              name="share-outline" 
              size={22} 
              color={isDarkMode ? "#FFF" : "#000"} 
            />
            <Text style={[{marginLeft: 5}, dynamicStyles.text]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={navigateToProfileSetup}
          >
            <Ionicons 
              name="pencil-outline" 
              size={22} 
              color={isDarkMode ? "#FFF" : "#000"} 
            />
            <Text style={[{marginLeft: 5}, dynamicStyles.text]}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Dark Mode Toggle */}
        <View style={[styles.toggleContainer, dynamicStyles.border]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons 
              name={isDarkMode ? "moon" : "sunny"} 
              size={22} 
              color={isDarkMode ? "#FFF" : "#000"}
              style={{marginRight: 10}}
            />
            <Text style={[styles.toggleLabel, dynamicStyles.text]}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={async (value) => {
              setIsDarkMode(value);
              await AsyncStorage.setItem('darkMode', value.toString());
            }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        {/* Couple Sharing Toggle */}
        <View style={[styles.toggleContainer, dynamicStyles.border]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons 
              name="people-outline" 
              size={22} 
              color={isDarkMode ? "#FFF" : "#000"}
              style={{marginRight: 10}}
            />
            <Text style={[styles.toggleLabel, dynamicStyles.text]}>Couple Sharing</Text>
          </View>
          <Switch
            value={isCoupleSharing}
            onValueChange={async (value) => {
              setIsCoupleSharing(value);
              await AsyncStorage.setItem('coupleSharing', value.toString());
            }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isCoupleSharing ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>

        {/* Rest of the existing components remain the same */}
        {/* Health Stats Cards */}
        <View style={[styles.healthStatsContainer, dynamicStyles.border]}>
          <View style={[styles.healthCard, { backgroundColor: isDarkMode ? '#2C2C2C' : '#E8F5E9' }]}>
            <Text style={[styles.healthCardLabel, dynamicStyles.subtextColor]}>Start weight</Text>
            <Text style={[styles.healthCardValue, dynamicStyles.text]}>68.5<Text style={styles.healthCardUnit}>kg</Text></Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: isDarkMode ? '#2C2C2C' : '#E0F7FA' }]}>
            <Text style={[styles.healthCardLabel, dynamicStyles.subtextColor]}>Goal</Text>
            <Text style={[styles.healthCardValue, dynamicStyles.text]}>64.0<Text style={styles.healthCardUnit}>kg</Text></Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: isDarkMode ? '#2C2C2C' : '#FFF8E1' }]}>
            <Text style={[styles.healthCardLabel, dynamicStyles.subtextColor]}>Calories</Text>
            <Text style={[styles.healthCardValue, dynamicStyles.text]}>182<Text style={styles.healthCardUnit}> kcal</Text></Text>
          </View>
        </View>

        {/* Existing list items with dark mode styling */}
        <View style={styles.listContainer}>
          {[
            { title: 'Physical activity', icon: 'pulse-outline', subtitle: 'Last activity: 2 days ago' },
            { title: 'Statistics', icon: 'stats-chart-outline', subtitle: 'Cycle length: 28 days' },
            { title: 'Appointments', icon: 'calendar-outline', subtitle: 'Next: March 15, 09:30 AM' },
            { title: 'Medications', icon: 'medical-outline', subtitle: '4 active prescriptions' },
            { title: 'Personal Information', icon: 'person-outline', subtitle: 'Age: 34, BMI: 24.5' },
            { title: 'Community', icon: 'people-outline', subtitle: 'Connect with others' }
          ].map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.listItem, 
                { borderBottomColor: isDarkMode ? '#333333' : '#F0F0F0' }
              ]}
              onPress={() => handleListItemPress(item.title)}
            >
              <View style={styles.listIconContainer}>
                <Ionicons 
                  name={item.icon as any} 
                  size={22} 
                  color={isDarkMode ? "#AAAAAA" : "#666"} 
                />
              </View>
              <View style={styles.listContent}>
                <Text style={[styles.listTitle, dynamicStyles.text]}>{item.title}</Text>
                <Text style={[styles.listSubtitle, dynamicStyles.subtextColor]}>{item.subtitle}</Text>
              </View>
              <Ionicons 
                name="chevron-forward" 
                size={22} 
                color={isDarkMode ? "#AAAAAA" : "#999"} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom spacing for navigation bar */}
        <View style={styles.navigationBarSpace} />
      </ScrollView>
    </View>
  );
};

// Styles remain the same as your original implementation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  settingsButton: {
    padding: 8,
  },
  profileBasic: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  profileLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  followStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  followColumn: {
    marginRight: 40,
  },
  followLabel: {
    fontSize: 14,
    color: '#777',
  },
  followCount: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  followActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  healthStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  healthCard: {
    borderRadius: 16,
    padding: 6,
    marginHorizontal: 5,
    marginBottom: 10,
    minWidth: 100,
  },
  healthCardLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  healthCardValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  healthCardUnit: {
    fontSize: 16,
    fontWeight: '400',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  sectionWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  progressDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
    marginLeft: 15,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  listSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  navigationBarSpace: {
    height: 100,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  
});

export default ProfileScreen;