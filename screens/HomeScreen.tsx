import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type StackParamList = {
  Home: undefined;
  Profile: undefined;
  Treat: undefined;
  BlogDetail: { blog: { id: string; title: string; subtitle: string; image: any } };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

const weekDays = [
  { day: 'Sun', date: '22', isSelected: false },
  { day: 'Mon', date: '23', isSelected: false },
  { day: 'Tue', date: '24', isSelected: false },
  { day: 'Wed', date: '25', isSelected: true },
  { day: 'Thu', date: '26', isSelected: false },
  { day: 'Fri', date: '27', isSelected: false },
  { day: 'Sat', date: '28', isSelected: false },
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
            <Image source={profilePicUri ? { uri: profilePicUri } : require('../assets/girl.jpg')} style={styles.profilePic} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Hello, Sandra</Text>
              <Text style={styles.date}>Today 25 Nov</Text>
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
            <Text style={styles.challengeDescription}>Your Personal Questionnaire</Text>
            
            <View style={styles.participantsContainer}>
              <Image source={require('../assets/avatar.jpeg')} style={styles.participantAvatar} />
              <Image source={require('../assets/avatar2.jpg')} style={[styles.participantAvatar, styles.participantOverlap]} />
              <Image source={require('../assets/avatar3.jpg')} style={[styles.participantAvatar, styles.participantOverlap2]} />
              <View style={styles.moreParticipants}>
                <Text style={styles.moreParticipantsText}>+4</Text>
              </View>
            </View>
          </View>
          
          {/* This would be your 3D model or image */}
          <View style={styles.challengeImageContainer}>
            <Image 
              source={require('../assets/DailyChallenge.jpg')} 
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
              }} 
            />
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

       {/* Your Blogs Section */}
       <Text style={styles.sectionTitle}>Latest Blogs</Text>
       <View style={styles.blogGrid}>
  <View style={styles.largeBlog}>
    <Image source={require('../assets/blog1.png')} style={styles.largeBlogImage} />
  </View>
  <View style={styles.smallBlogsContainer}>
    <View style={[styles.smallBlog, styles.firstSmallBlog]}>
      <Image source={require('../assets/blog5.png')} style={styles.smallBlogImage} />
    </View>
    <View style={styles.smallBlog}>
      <Image source={require('../assets/blog6.png')} style={styles.smallBlogImage} />
    </View>
  </View>
</View>

{/* Full-width Blog (Blog 4)
<View style={styles.fullWidthBlog}>
  <Image source={require('../assets/blog4.png')} style={styles.fullWidthImage} />
</View> */}

{/* Half-width Blogs (Blogs 5 & 6) */}
{/* <View style={styles.halfWidthBlogs}>
  <View style={styles.halfBlog}>
    <Image source={require('../assets/blog5.png')} style={styles.halfBlogImage} />
  </View>
  <View style={styles.halfBlog}>
    <Image source={require('../assets/blog6.png')} style={styles.halfBlogImage} />
  </View> */}
{/* </View> */}

{/* Spacer to Avoid Merging with Bottom Navigation */}
<View style={{ height: 80 }} />
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
</ScrollView>
  );
};

const styles = StyleSheet.create({
  extraBlogsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  fullWidthBlog: {
    width: '100%',
    backgroundColor: 'rgb(242, 214, 237)',
    borderRadius: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
    elevation: 13,
  },
  fullWidthImage: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  halfWidthBlogs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  halfBlog: {
    width: '48%',
    aspectRatio: 1.5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  halfBlogImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blogGrid: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 1,
    marginTop: 2,
    paddingBottom: 120, //removes merging with bottom navigation
  },
  
  largeBlog: {
    flex: 1, 
    borderRadius: 16,
    overflow: 'hidden', // Keeps image inside rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
    elevation: 13,
    height: 270,
  },
  
  largeBlogImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',  // Ensures image fills space
  },
  
  smallBlogsContainer: {
    flex: 1, 
    justifyContent: 'space-between',
  },
  firstSmallBlog: {
    marginBottom: 10,  // Adjust this value as needed
  },
  smallBlog: {
    borderRadius: 16,
    overflow: 'hidden', // Keeps image inside rounded corners
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
    elevation: 13,
    height: 130, // Set height properly
  },
  
  smallBlogImage: {
    width: '100%',
    height: '100%', // Makes sure it fully fills the container
    resizeMode: 'cover',
  },
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
    paddingLeft: 50,
  },
  date: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 70,
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
    height: 70,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 0.5,
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
    color: '#fff',
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
    marginBottom: 20,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCard: {
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
  activityImage: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
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
    backgroundColor: 'rgba(255, 98, 247, 0.68)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  socialImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
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
  // Modal styles
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