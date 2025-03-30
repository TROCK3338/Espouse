import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Dimensions, Animated } from 'react-native';
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

// Function to generate dynamic week days based on current date
const generateWeekDays = () => {
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const weekDays = [];
  for (let i = -3; i <= 3; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    weekDays.push({
      day: dayNames[date.getDay()],
      date: date.getDate().toString(),
      isSelected: i === 0, // Today is selected by default
      fullDate: date.toISOString().split('T')[0], // Store full date for appointment
    });
  }
  
  return weekDays;
};

// Blog data
const blogData = [
  { 
    id: 'blog1', 
    image: require('../../assets/blog1.png'),
    title: 'Understanding IVF Success Rates',
    content: 'In vitro fertilization (IVF) success rates vary based on multiple factors including age, fertility diagnosis, and treatment protocol. Modern advances have significantly improved outcomes for many patients.',
    datePosted: 'March 28, 2025'
  },
  { 
    id: 'blog2', 
    image: require('../../assets/blog5.png'),
    title: 'Nutrition Tips During Fertility Treatment',
    content: 'Proper nutrition plays a crucial role during fertility treatments. Focus on consuming a balanced diet rich in antioxidants, healthy fats, and complex carbohydrates to support reproductive health.',
    datePosted: 'March 25, 2025'
  },
  { 
    id: 'blog3', 
    image: require('../../assets/blog6.png'),
    title: 'Managing Stress During Your Fertility Journey',
    content: 'Stress management techniques like meditation, yoga, and counseling can be valuable tools during fertility treatment. Research suggests that reducing stress may positively impact treatment outcomes.',
    datePosted: 'March 20, 2025'
  }
];

// Health questionnaire questions
const questionnaireQuestions = [
  { id: 'q1', question: 'How many days is your typical menstrual cycle?', type: 'input', keyboardType: 'numeric' },
  { id: 'q2', question: 'Have you undergone any fertility treatments before?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'q3', question: 'On a scale of 1-10, how would you rate your stress level?', type: 'slider', min: 1, max: 10 },
  { id: 'q4', question: 'Are you currently taking any medications?', type: 'radio', options: ['Yes', 'No'] },
  { id: 'q5', question: 'How many hours of sleep do you get on average?', type: 'input', keyboardType: 'numeric' },
];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [profilePicUri, setProfilePicUri] = useState<string | null>(null);
  
  // Dynamic week days
  const [weekDays, setWeekDays] = useState(generateWeekDays());
  
  // Appointment booking modal
  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentReason, setAppointmentReason] = useState('');
  
  // Blog story modal
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const storyProgressValue = useRef(new Animated.Value(0)).current;
  const storyTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Questionnaire modal
  const [questionnaireVisible, setQuestionnaireVisible] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<{[key: string]: any}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
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
    
    // Update week days on component mount
    setWeekDays(generateWeekDays());
  }, []);
  
  // Format current date for display
  const getCurrentFormattedDate = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Today ${today.getDate()} ${months[today.getMonth()]}`;
  };
  
  // Handle date selection for appointment
  const handleDaySelect = (index: number) => {
    const newWeekDays = weekDays.map((item, i) => ({
      ...item,
      isSelected: i === index
    }));
    setWeekDays(newWeekDays);
    setSelectedDate(newWeekDays[index].fullDate);
    setAppointmentModalVisible(true);
  };
  
  // Handle appointment submission
  const handleAppointmentSubmit = () => {
    if (!appointmentTime) {
      Alert.alert("Error", "Please select an appointment time");
      return;
    }
    
    Alert.alert(
      "Appointment Scheduled",
      `Your appointment has been scheduled for ${selectedDate} at ${appointmentTime}${appointmentReason ? `\nReason: ${appointmentReason}` : ''}`,
      [{ text: "OK", onPress: () => setAppointmentModalVisible(false) }]
    );
    
    // Reset form
    setAppointmentTime('');
    setAppointmentReason('');
  };
  
  // Start story timer
  const startStoryTimer = () => {
    storyProgressValue.setValue(0);
    
    Animated.timing(storyProgressValue, {
      toValue: 1,
      duration: 5000, // 5 seconds per story
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });
    
    // Safety timeout to ensure stories advance
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    storyTimeout.current = setTimeout(goToNextStory, 5100);
  };
  
  // Go to next story
  const goToNextStory = () => {
    if (currentBlogIndex < blogData.length - 1) {
      setCurrentBlogIndex(currentBlogIndex + 1);
      startStoryTimer();
    } else {
      // End of stories
      closeStoryModal();
    }
  };
  
  // Go to previous story
  const goToPrevStory = () => {
    if (currentBlogIndex > 0) {
      setCurrentBlogIndex(currentBlogIndex - 1);
      startStoryTimer();
    }
  };
  
  // Open story modal
  const openStoryModal = (index: number) => {
    setCurrentBlogIndex(index);
    setStoryModalVisible(true);
    startStoryTimer();
  };
  
  // Close story modal
  const closeStoryModal = () => {
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    setStoryModalVisible(false);
    setCurrentBlogIndex(0);
    storyProgressValue.setValue(0);
  };
  
  // Handle story tap
  const handleStoryTap = (event: any) => {
    const screenWidth = Dimensions.get('window').width;
    const tapX = event.nativeEvent.locationX;
    
    if (tapX < screenWidth * 0.3) {
      // Tap on left side (previous)
      goToPrevStory();
    } else if (tapX > screenWidth * 0.7) {
      // Tap on right side (next)
      goToNextStory();
    }
  };
  
  // Handle questionnaire answer
  const handleQuestionnaireAnswer = (questionId: string, answer: any) => {
    setQuestionnaireAnswers({
      ...questionnaireAnswers,
      [questionId]: answer
    });
  };
  
  // Go to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionnaireQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of questionnaire
      handleQuestionnaireSubmit();
    }
  };
  
  // Handle questionnaire submission
  const handleQuestionnaireSubmit = () => {
    Alert.alert(
      "Questionnaire Submitted",
      "Thank you for completing your daily health questionnaire!",
      [{ text: "OK", onPress: () => {
        setQuestionnaireVisible(false);
        setCurrentQuestionIndex(0);
        setQuestionnaireAnswers({});
      }}]
    );
  };
  
  // Render radio options
  const renderRadioOptions = (options: string[], questionId: string) => {
    return (
      <View style={styles.radioContainer}>
        {options.map((option) => (
          <TouchableOpacity 
            key={option}
            style={styles.radioOption}
            onPress={() => handleQuestionnaireAnswer(questionId, option)}
          >
            <View style={[
              styles.radioOuterCircle,
              questionnaireAnswers[questionId] === option && styles.radioOuterCircleSelected
            ]}>
              {questionnaireAnswers[questionId] === option && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  // Render slider
  const renderSlider = (min: number, max: number, questionId: string) => {
    const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    return (
      <View style={styles.sliderContainer}>
        <View style={styles.sliderValues}>
          {values.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.sliderValue,
                questionnaireAnswers[questionId] === value && styles.sliderValueSelected
              ]}
              onPress={() => handleQuestionnaireAnswer(questionId, value)}
            >
              <Text style={[
                styles.sliderValueText,
                questionnaireAnswers[questionId] === value && styles.sliderValueTextSelected
              ]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabelText}>Low</Text>
          <Text style={styles.sliderLabelText}>High</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={profilePicUri ? { uri: profilePicUri } : require('../../assets/girl.jpg')} style={styles.profilePic} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>Hello, Sandra</Text>
              <Text style={styles.date}>{getCurrentFormattedDate()}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Daily Challenge Section */}
        <TouchableOpacity 
          style={styles.challengeCard}
          onPress={() => setQuestionnaireVisible(true)}
        >
          <View style={styles.challengeTextContainer}>
            <Text style={styles.challengeTitle}>Daily challenge</Text>
            <Text style={styles.challengeDescription}>Your Personal Questionnaire</Text>
            
            <View style={styles.participantsContainer}>
              <Image source={require('../../assets/avatar.jpeg')} style={styles.participantAvatar} />
              <Image source={require('../../assets/avatar2.jpg')} style={[styles.participantAvatar, styles.participantOverlap]} />
              <Image source={require('../../assets/avatar3.jpg')} style={[styles.participantAvatar, styles.participantOverlap2]} />
              <View style={styles.moreParticipants}>
                <Text style={styles.moreParticipantsText}>+4</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.challengeImageContainer}>
            <Image 
              source={require('../../assets/DailyChallenge.jpg')} 
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
              }} 
            />
          </View>
        </TouchableOpacity>

        {/* Week Day Selector */}
        <View style={styles.weekDaySelector}>
          {weekDays.map((item, index) => (
            <TouchableOpacity 
              key={item.day + item.date} 
              style={[styles.dayItem, item.isSelected && styles.selectedDayItem]}
              onPress={() => handleDaySelect(index)}
            >
              <Text style={[styles.dayText, item.isSelected && styles.selectedDayText]}>{item.day}</Text>
              <Text style={[styles.dateText, item.isSelected && styles.selectedDateText]}>{item.date}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Your Blogs Section */}
        <Text style={styles.sectionTitle}>Latest Blogs</Text>
        <View style={styles.blogGrid}>
          <TouchableOpacity 
            style={styles.largeBlog}
            onPress={() => openStoryModal(0)}
          >
            <Image source={blogData[0].image} style={styles.largeBlogImage} />
          </TouchableOpacity>
          <View style={styles.smallBlogsContainer}>
            <TouchableOpacity 
              style={[styles.smallBlog, styles.firstSmallBlog]}
              onPress={() => openStoryModal(1)}
            >
              <Image source={blogData[1].image} style={styles.smallBlogImage} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.smallBlog}
              onPress={() => openStoryModal(2)}
            >
              <Image source={blogData[2].image} style={styles.smallBlogImage} />
            </TouchableOpacity>
          </View>
        </View>

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
      
      {/* Appointment Booking Modal */}
      <Modal
        visible={appointmentModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAppointmentModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.appointmentModal}>
            <Text style={styles.modalTitle}>Schedule Appointment</Text>
            <Text style={styles.appointmentDateText}>
              {selectedDate ? new Date(selectedDate).toDateString() : 'Select a date'}
            </Text>
            
            <Text style={styles.inputLabel}>Appointment Time</Text>
            <View style={styles.timeSelectionContainer}>
              {['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    appointmentTime === time && styles.timeOptionSelected
                  ]}
                  onPress={() => setAppointmentTime(time)}
                >
                  <Text style={[
                    styles.timeOptionText,
                    appointmentTime === time && styles.timeOptionTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.inputLabel}>Reason for Visit (Optional)</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason for your appointment..."
              value={appointmentReason}
              onChangeText={setAppointmentReason}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setAppointmentModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAppointmentSubmit}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Blog Story Modal */}
      <Modal
        visible={storyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeStoryModal}
      >
        <TouchableOpacity
          style={styles.storyContainer}
          activeOpacity={1}
          onPress={handleStoryTap}
        >
          {/* Progress bar */}
          <View style={styles.storyProgressContainer}>
            {blogData.map((_, index) => (
              <View key={index} style={styles.storyProgressBar}>
                <Animated.View
                  style={[
                    styles.storyProgressFill,
                    {
                      width: index === currentBlogIndex
                        ? storyProgressValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                          })
                        : index < currentBlogIndex ? '100%' : '0%'
                    }
                  ]}
                />
              </View>
            ))}
          </View>
          
          {/* Story header */}
          <View style={styles.storyHeader}>
            <View style={styles.storyProfile}>
              <Image source={require('../../assets/avatar.jpeg')} style={styles.storyProfileImage} />
              <View>
                <Text style={styles.storyProfileName}>Health Blog</Text>
                <Text style={styles.storyDate}>{blogData[currentBlogIndex].datePosted}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={closeStoryModal}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          
          {/* Story content */}
          <Image source={blogData[currentBlogIndex].image} style={styles.storyImage} />
          <View style={styles.storyContentOverlay}>
            <Text style={styles.storyTitle}>{blogData[currentBlogIndex].title}</Text>
            <Text style={styles.storyContent}>{blogData[currentBlogIndex].content}</Text>
          </View>
          
          {/* Tap indicators */}
          <View style={styles.tapIndicators}>
            <TouchableOpacity 
              style={styles.tapLeft}
              onPress={goToPrevStory}
            />
            <TouchableOpacity 
              style={styles.tapRight}
              onPress={goToNextStory}
            />
          </View>
        </TouchableOpacity>
      </Modal>
      
      {/* Health Questionnaire Modal */}
      <Modal
        visible={questionnaireVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setQuestionnaireVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.questionnaireModal}>
            <View style={styles.questionnaireHeader}>
              <Text style={styles.questionnaireTitle}>Daily Health Check</Text>
              <Text style={styles.questionnaireSubtitle}>
                Question {currentQuestionIndex + 1} of {questionnaireQuestions.length}
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${((currentQuestionIndex + 1) / questionnaireQuestions.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>
                {questionnaireQuestions[currentQuestionIndex].question}
              </Text>
              
              {/* Render different input types based on question type */}
              {questionnaireQuestions[currentQuestionIndex].type === 'input' && (
                <TextInput
                  style={styles.questionnaireInput}
                  keyboardType={questionnaireQuestions[currentQuestionIndex].keyboardType || 'default'}
                  value={questionnaireAnswers[questionnaireQuestions[currentQuestionIndex].id] || ''}
                  onChangeText={(text) => handleQuestionnaireAnswer(
                    questionnaireQuestions[currentQuestionIndex].id, 
                    text
                  )}
                  placeholder="Enter your answer"
                />
              )}
              
              {questionnaireQuestions[currentQuestionIndex].type === 'radio' && (
                renderRadioOptions(
                  questionnaireQuestions[currentQuestionIndex].options || [],
                  questionnaireQuestions[currentQuestionIndex].id
                )
              )}
              
              {questionnaireQuestions[currentQuestionIndex].type === 'slider' && (
                renderSlider(
                  questionnaireQuestions[currentQuestionIndex].min || 1,
                  questionnaireQuestions[currentQuestionIndex].max || 10,
                  questionnaireQuestions[currentQuestionIndex].id
                )
              )}
            </View>
            
            <View style={styles.questionnaireFooter}>
              <TouchableOpacity
                style={[styles.questionnaireButton, styles.questionnaireSkipButton]}
                onPress={() => setQuestionnaireVisible(false)}
              >
                <Text style={styles.questionnaireSkipButtonText}>Skip</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.questionnaireButton, 
                  styles.questionnaireNextButton,
                  !questionnaireAnswers[questionnaireQuestions[currentQuestionIndex].id] && 
                    styles.questionnaireButtonDisabled
                ]}
                onPress={goToNextQuestion}
                disabled={!questionnaireAnswers[questionnaireQuestions[currentQuestionIndex].id]}
              >
                <Text style={styles.questionnaireNextButtonText}>
                  {currentQuestionIndex === questionnaireQuestions.length - 1 ? 'Submit' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Original styles from your component
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
    paddingLeft: 40,
  },
  date: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 59,
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
    borderRadius: 20,
    overflow: 'hidden',
  },
  weekDaySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedDayItem: {
    backgroundColor: '#8162FF',
  },
  dayText: {
    fontSize: 14,
    color: '#888',
  },
  selectedDayText: {
    color: '#fff',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  selectedDateText: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 1000,
    padding: 20,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  appointmentModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentDateText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: '#8162FF',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  timeOptionSelected: {
    backgroundColor: '#8162FF',
    borderColor: '#8162FF',
  },
  timeOptionText: {
    color: '#333',
  },
  timeOptionTextSelected: {
    color: '#fff',
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#8162FF',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  storyContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyProgressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    gap: 4,
  },
  storyProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  storyProgressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  storyProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storyProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  storyProfileName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  storyDate: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },
  storyContentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  storyTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyContent: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  tapIndicators: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  tapLeft: {
    flex: 1,
  },
  tapRight: {
    flex: 1,
  },
  questionnaireModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  questionnaireHeader: {
    marginBottom: 30,
  },
  questionnaireTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  questionnaireSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8162FF',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionnaireInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  radioContainer: {
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    borderColor: '#8162FF',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#8162FF',
  },
  radioText: {
    marginLeft: 10,
    fontSize: 16,
  },
  sliderContainer: {
    marginTop: 10,
  },
  sliderValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderValueSelected: {
    backgroundColor: '#8162FF',
  },
  sliderValueText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sliderValueTextSelected: {
    color: '#fff',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  sliderLabelText: {
    color: '#888',
    fontSize: 14,
  },
  questionnaireFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionnaireButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  questionnaireSkipButton: {
    backgroundColor: '#f0f0f0',
  },
  questionnaireNextButton: {
    backgroundColor: '#8162FF',
  },
  questionnaireButtonDisabled: {
    backgroundColor: '#d0d0d0',
  },
  questionnaireSkipButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  questionnaireNextButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default HomeScreen;