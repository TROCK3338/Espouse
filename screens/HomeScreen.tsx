import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Modal } from 'react-native';
// import { StackParamList } from '../navigation/types'; // Change path based on your project structure

type HomeScreenNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>;

export type StackParamList = {
  Home: undefined;
  Profile: undefined;
  Treat: undefined;  // Add other screens here
  BlogDetail: { blog: { id: string; title: string; subtitle: string; image: any } }; 

};

const blogs = [
  { id: '1', image: require('../assets/blog1.png'), title: "Blog Title 1",
    subtitle: "This is a short blog description"},
  { id: '2', image: require('../assets/blog2.png' ), title: "Blog Title 2",
    subtitle: "Another description here"},
  { id: '3', image: require('../assets/blog3.png') },
  { id: '4', image: require('../assets/blog4.png') },
  { id: '5', image: require('../assets/blog5.png') },
  { id: '6', image: require('../assets/blog6.png') },
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



const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingBottom: 20 },
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingHorizontal: 15, paddingTop: 40 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, marginTop: 10 },
  username: { fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft: 18 },
  icon: { marginRight: 12 },
  profilePic: { width: 45, height: 45, borderRadius: 22.5 },
  searchBar: { flex: 1, backgroundColor: '#fff', borderRadius: 40, padding: 12, fontSize: 16, elevation: 3 },
  moodBox: { backgroundColor: 'rgba(128, 135, 228, 0.15)', borderRadius: 18, padding: 15, marginBottom: 20, height: 145 },
  moodTitle: { fontSize: 15,color : 'grey', fontWeight: 'bold', margin: 5 },
  moodContent: { fontSize: 16, color: '#555' },
  //learnMoreButton
  topicButton: {backgroundColor: 'darkorange', borderRadius: 15, alignSelf:'center', marginTop: 39, marginRight: -250, padding: 10, width: 100},
  buttonText: {color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center'},
  //updatesAndDigitalReports
  reports : {backgroundColor: 'rgba(103, 113, 250, 0.9)', borderRadius: 18, alignSelf:'center', marginRight: 180, marginTop: -45, width: 150, paddingHorizontal: 12,
    paddingVertical: 15},
  updates : {backgroundColor: 'rgba(103, 113, 250, 0.9)',
  borderRadius: 18, alignSelf:'center', marginTop: -10, marginLeft: 170, width: 150,
  paddingHorizontal: 12,
  paddingVertical: 15,},
  //blogSection
  blogtitle: { fontSize: 15, fontWeight: 'bold', color: 'black', margin: 10 },
  blogGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  blogCard: { width: '32%', aspectRatio: 1, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', marginBottom: 10 },
  blogImage: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 18 },
  //modalFunctioning
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


return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          {!searchActive ? (
            <>
              <TouchableOpacity onPress={() => setSearchActive(true)}>
                <Ionicons name="search" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.username}>Hello, Prachi</Text>
              {/* <Ionicons name="notifications-outline" size={24} color="#333" style={styles.icon} /> */}
              <TouchableOpacity>
                <Image source={profilePicUri ? { uri: profilePicUri } : require('../assets/profile.png')} style={styles.profilePic} />
              </TouchableOpacity>
              
            </>
          ) : (
            <TextInput
            style={styles.searchBar}
            placeholder="Search anything..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            onBlur={() => setSearchActive(false)}
            />
          )}
        </View>

        {/* Topic of the Day */}
          <Text style={styles.moodTitle}>TOPIC OF THE DAY</Text>
        <View style={styles.moodBox}>
          <Text style={styles.moodContent}>“Hypo-Osmotic Swelling Test” - Check the Functional Integrity</Text>
        {/* Button */}
        <TouchableOpacity style={styles.topicButton} onPress={() => {setModalContent('learnMore');
          setModalVisible(true)}}>
        <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity> 
        </View>

        {/* Updates & Digital Reports */}
        <TouchableOpacity style={styles.updates} onPress={() => {setModalContent('updates');
        setModalVisible(true)}}>
        <Text style={styles.buttonText}>UPDATES {'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reports} onPress={() => {setModalContent('reports');
          setModalVisible(true)}}>
        <Text style={styles.buttonText}>REPORTS {'>'}</Text>
        </TouchableOpacity>


        {/* Blogs Grid */}
          <Text style={styles.blogtitle}>BLOGS</Text>
        <View style={styles.blogGrid}>
          {blogs.map((blog) => (
            <TouchableOpacity 
            key={blog.id} 
            style={styles.blogCard} 
            onPress={() => navigation.navigate("BlogDetail", { 
              blog : {
              id: blog.id, 
              title: blog.title ?? "Untitled",
              subtitle: blog.subtitle ?? "No subtitle available",
              image: blog.image 
            }})}>
              <Image source={blog.image} style={styles.blogImage} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

        {/* Modal Dialog */}
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
            </ScrollView>
  );
};
  export default HomeScreen;
  