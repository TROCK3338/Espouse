import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal } from 'react-native';

export type StackParamList = {
  Home: undefined;
  Profile: undefined;
  Treat: undefined;
  BlogDetail: { blog: { id: string; title: string; subtitle: string; image: any } };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

const blogs = [
  { id: '1', image: require('../assets/blog1.png'), title: "Blog Title 1", subtitle: "This is a short blog description"},
  { id: '2', image: require('../assets/blog2.png'), title: "Blog Title 2", subtitle: "Another description here"},
  { id: '3', image: require('../assets/blog3.png'), title: "Blog Title 3", subtitle: "Third blog description"},
  { id: '4', image: require('../assets/blog4.png'), title: "Blog Title 4", subtitle: "Fourth blog description"},
  { id: '5', image: require('../assets/blog5.png'), title: "Blog Title 5", subtitle: "Fifth blog description"},
  { id: '6', image: require('../assets/blog6.png'), title: "Blog Title 6", subtitle: "Sixth blog description"},
];

// Activities data
const activities = [
  { id: '1', name: 'Yoga Group', date: '25 Nov.', time: '14:00-15:00', room: 'A5 room', difficulty: 'Medium', trainer: 'Tiffany Way', trainerImage: require('../assets/profile.png'), backgroundColor: '#FFD38C' },
  { id: '2', name: 'Balance', date: '28 Nov.', time: '18:00-19:30', room: 'A2 room', difficulty: 'Light', backgroundColor: '#B7DBFF' },
];

const weekDays = [
  { day: 'Sun', date: '22', isSelected: false },
  { day: 'Mon', date: '23', isSelected: false },
  { day: 'Tue', date: '24', isSelected: false },
  { day: 'Wed', date: '25', isSelected: true },
  { day: 'Thu', date: '26', isSelected: false },
  { day: 'Fri', date: '27', isSelected: false },
  { day: 'Sat', date: '28', isSelected: false },
];

const socialIcons = [
  { id: '1', icon: 'logo-instagram' },
  { id: '2', icon: 'logo-youtube' },
  { id: '3', icon: 'logo-twitter' },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [profilePicUri, setProfilePicUri] = useState<string | null>(null);

  useEffect(() => {
    const loadProfilePicture = async () => {
      try {
        const savedProfilePic = await AsyncStorage.getItem('profilePicture');
        if (savedProfilePic) setProfilePicUri(savedProfilePic);
      } catch (error) {
        console.error('Error loading profile picture:', error);
      }
    };
    loadProfilePicture();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={profilePicUri ? { uri: profilePicUri } : require('../assets/profile.png')} style={styles.profilePic} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Hello, Sandra</Text>
              <Text style={styles.date}>Today 25 Nov.</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Daily Challenge Section */}
        <View style={styles.challengeCard}>
          <View style={styles.challengeTextContainer}>
            <Text style={styles.challengeTitle}>Daily challenge</Text>
            <Text style={styles.challengeDescription}>Do your plan before 09:00 AM</Text>
            
            <View style={styles.participantsContainer}>
              <Image source={require('../assets/profile.png')} style={styles.participantAvatar} />
              <Image source={require('../assets/profile.png')} style={[styles.participantAvatar, styles.participantOverlap]} />
              <Image source={require('../assets/profile.png')} style={[styles.participantAvatar, styles.participantOverlap2]} />
              <View style={styles.moreParticipants}>
                <Text style={styles.moreParticipantsText}>+4</Text>
              </View>
            </View>
          </View>
          
          {/* This would be your 3D model or image */}
          <View style={styles.challengeImageContainer}>
            {/* Replace this with your actual image or 3D rendering */}
            <View style={styles.placeholderShapes}>
              <View style={[styles.shapeCircle, { backgroundColor: '#FFA500' }]} />
              <View style={[styles.shapeCircle, { backgroundColor: '#808080' }]} />
              <View style={[styles.shapeCircle, { backgroundColor: '#FFFF00' }]} />
            </View>
          </View>
        </View>

        {/* Week Day Selector */}
        <View style={styles.weekDaySelector}>
          {weekDays.map((item) => (
            <TouchableOpacity 
              key={item.day} 
              style={[styles.dayItem, item.isSelected && styles.selectedDayItem]}
            >
              <Text style={[styles.dayText, item.isSelected && styles.selectedDayText]}>{item.day}</Text>
              <Text style={[styles.dateText, item.isSelected && styles.selectedDateText]}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Your Plan Section */}
        <Text style={styles.sectionTitle}>Your plan</Text>
        
        <View style={styles.planContainer}>
          {/* Activity Cards */}
          {activities.map((activity) => (
            <View key={activity.id} style={[styles.activityCard, { backgroundColor: activity.backgroundColor }]}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityDifficulty}>{activity.difficulty}</Text>
              </View>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
              <Text style={styles.activityRoom}>{activity.room}</Text>
              
              {activity.trainer && (
                <View style={styles.trainerContainer}>
                  <Text style={styles.trainerLabel}>Trainer</Text>
                  <View style={styles.trainerInfo}>
                    <Image source={activity.trainerImage} style={styles.trainerImage} />
                    <Text style={styles.trainerName}>{activity.trainer}</Text>
                  </View>
                </View>
              )}
            </View>
          ))}
          
          {/* Social Media Links */}
          <View style={styles.socialCard}>
            <View style={styles.socialIconsContainer}>
              {socialIcons.map((item) => (
                <View key={item.id} style={styles.socialIconCircle}>
                  <Ionicons name={item.icon} size={24} color="#888" />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Search Modal */}
        {searchActive && (
          <View style={styles.searchOverlay}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search anything..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
              />
              <TouchableOpacity onPress={() => setSearchActive(false)}>
                <Ionicons name="close-circle-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Modal Dialog (kept from your original code) */}
        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              {/* Dynamic Title */}
              <Text style={styles.modalTitle}>
                {modalContent === "learnMore" ? "Learn More" : modalContent === "reports" ? "Reports" : "Updates"}
              </Text>

              {/* Dynamic Image (Optional) */}
              {modalContent === "learnMore" && <Image source={require("../assets/TOD.jpg")} style={styles.modalImage} />}
              <ScrollView style={{ maxHeight: "70%" }} contentContainerStyle={{ padding: 5 }}>
              {modalContent === "reports" && (
              <Text style={styles.modalText}>We will link it to the backend to upload reports</Text>
              )}
              {modalContent === "updates" && (
                <Text style={styles.modalText}>We will link it to the backend to track updates.
              </Text>
              )}
              </ScrollView>

              {/* Dynamic Description */}
              <Text style={styles.modalText}>
                {modalContent === "learnMore" 
                  ? "This is additional information about the topic."
                  : modalContent === "reports" 
                  ? "Here are your reports details."
                  : "Here are the latest updates for you!"}
              </Text>

              {/* Close Button */}
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    backgroundColor: '#f8f8fa'
  },
  container: { 
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  challengeCard: {
    backgroundColor: 'rgba(129, 98, 255, 0.58)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 180,
  },
  challengeTextContainer: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  participantOverlap: {
    marginLeft: -10,
  },
  participantOverlap2: {
    marginLeft: -10,
  },
  moreParticipants: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#8162FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreParticipantsText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  challengeImageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderShapes: {
    width: 100,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shapeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    position: 'absolute',
  },
  weekDaySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  dayItem: {
    width: 40,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  selectedDayItem: {
    backgroundColor: '#000',
  },
  dayText: {
    fontSize: 12,
    color: '#888',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  selectedDayText: {
    color: '#aaa',
  },
  selectedDateText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  planContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityCard: {
    width: '48%',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  activityHeader: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  activityDifficulty: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    fontSize: 12,
  },
  activityName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityDate: {
    fontSize: 14,
    color: '#333',
  },
  activityTime: {
    fontSize: 14,
    marginBottom: 3,
  },
  activityRoom: {
    fontSize: 14,
    marginBottom: 12,
  },
  trainerContainer: {
    marginTop: 10,
  },
  trainerLabel: {
    fontSize: 12,
    color: '#555',
  },
  trainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  trainerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  trainerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  socialCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 98, 247, 0.68)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  // Keep these for your modal functionality
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 400,
    borderRadius: 15,
    marginBottom: 15,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;