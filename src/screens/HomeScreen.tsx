import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Dimensions, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { homestyles } from '../styles/HomeScreenStyles'; //stylesheet

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
      isSelected: i === 0, // Today (i === 0) is selected by default
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
    content: 'Modern advances in IVF protocols have significantly improved outcomes across all age groups. This article explores the key factors that influence success rates and what to expect during your journey.',
    excerpt: 'Learn about the latest advances in IVF and what factors influence treatment success.',
    datePosted: 'March 28, 2025',
    category: 'Treatment'
  },
  { 
    id: 'blog2', 
    image: require('../../assets/blog5.png'),
    title: 'Nutrition Tips During Fertility Treatment',
    content: 'Proper nutrition provides the foundation for reproductive health. This guide covers essential nutrients, meal planning strategies, and scientific evidence behind fertility-boosting foods to support your treatment.',
    excerpt: 'Optimize your diet to support fertility treatments with these evidence-based recommendations.',
    datePosted: 'March 25, 2025',
    category: 'Wellness'
  },
  { 
    id: 'blog3', 
    image: require('../../assets/blog6.png'),
    title: 'Managing Stress During Your Fertility Journey',
    content: 'Stress management is a crucial but often overlooked aspect of fertility treatment. Discover clinically-proven techniques to reduce anxiety, improve sleep quality, and create emotional resilience during this challenging time.',
    excerpt: 'Effective strategies to manage stress and build resilience during fertility treatments.',
    datePosted: 'March 20, 2025',
    category: 'Mental Health'
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
  const [userName, setUserName] = useState('User'); //To store username
  
  // Dynamic week days
  const [weekDays, setWeekDays] = useState(generateWeekDays());
  
  // Store separately which date is the "today" date
  const [todayIndex, setTodayIndex] = useState(3); // Default middle of array (index 3)
  
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
  const storyAnimation = useRef<Animated.CompositeAnimation | null>(null);
  
  // Story swipe animation
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const [isPaused, setIsPaused] = useState(false);
  
  // Questionnaire modal
  const [questionnaireVisible, setQuestionnaireVisible] = useState(false);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<{[key: string]: any}>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedProfilePic = await AsyncStorage.getItem('profilePicture');
        const savedUserName = await AsyncStorage.getItem('userName'); // Add this line
        
        if (savedProfilePic) setProfilePicUri(savedProfilePic);
        if (savedUserName) setUserName(savedUserName); // Add this line
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };
    loadProfileData();
    
    // Update week days on component mount
    setWeekDays(generateWeekDays());
    
    // Set initial selected date to today
    setSelectedDate(weekDays.find(day => day.isSelected)?.fullDate || null);
  }, []);
  
  // Format current date for display
  const getCurrentFormattedDate = () => {
    const today = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `Today ${today.getDate()} ${months[today.getMonth()]}`;
  };
  
  // Handle date selection for appointment
  const handleDaySelect = (index: number) => {
    // Get the selected date object
    const selectedDateObj = new Date(weekDays[index].fullDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    // Check if the selected date is in the past
    if (selectedDateObj < today) {
      Alert.alert("Invalid Selection", "Cannot book appointments for past dates");
      return;
    }
    
    // Keep today highlighted but also set the selected date for appointment
    setSelectedDate(weekDays[index].fullDate);
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
    setIsPaused(false);
    storyProgressValue.setValue(0);
    
    // Cancel any existing animation
    if (storyAnimation.current) {
      storyAnimation.current.stop();
    }
    
    // Create and store new animation
    storyAnimation.current = Animated.timing(storyProgressValue, {
      toValue: 1,
      duration: 5000, // 5 seconds per story
      useNativeDriver: false,
    });
    
    // Start the animation
    storyAnimation.current.start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });
    
    // Safety timeout to ensure stories advance
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    storyTimeout.current = setTimeout(goToNextStory, 5100);
  };
  
  // Pause story timer
  const pauseStoryTimer = () => {
    setIsPaused(true);
    if (storyAnimation.current) {
      storyAnimation.current.stop();
    }
    if (storyTimeout.current) {
      clearTimeout(storyTimeout.current);
    }
  };
  
  // Resume story timer
  const resumeStoryTimer = () => {
    setIsPaused(false);
    const remainingTime = (1 - storyProgressValue.getValue()) * 5000;
    
    if (storyAnimation.current) {
      storyAnimation.current = Animated.timing(storyProgressValue, {
        toValue: 1,
        duration: remainingTime,
        useNativeDriver: false,
      });
      
      storyAnimation.current.start(({ finished }) => {
        if (finished) {
          goToNextStory();
        }
      });
    }
    
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    storyTimeout.current = setTimeout(goToNextStory, remainingTime + 100);
  };
  
  // Go to next story with animation
  const goToNextStory = () => {
    // Cancel any existing timers
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    
    if (currentBlogIndex < blogData.length - 1) {
      // Animate swipe to left
      swipeAnim.setValue(0);
      Animated.timing(swipeAnim, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentBlogIndex(currentBlogIndex + 1);
        swipeAnim.setValue(Dimensions.get('window').width);
        Animated.timing(swipeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          startStoryTimer();
        });
      });
    } else {
      // End of stories
      closeStoryModal();
    }
  };
  
  // Go to previous story with animation
  const goToPrevStory = () => {
    // Cancel any existing timers
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    
    if (currentBlogIndex > 0) {
      // Animate swipe to right
      swipeAnim.setValue(0);
      Animated.timing(swipeAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setCurrentBlogIndex(currentBlogIndex - 1);
        swipeAnim.setValue(-Dimensions.get('window').width);
        Animated.timing(swipeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          startStoryTimer();
        });
      });
    } else {
      // Already at the first story, restart timer
      startStoryTimer();
    }
  };
  
  // Open story modal
  const openStoryModal = (index: number) => {
    setCurrentBlogIndex(index);
    swipeAnim.setValue(0); // Reset animation value
    setStoryModalVisible(true);
    
    // Small delay to ensure modal is fully visible before starting timer
    setTimeout(() => {
      startStoryTimer();
    }, 100);
  };
  
  // Close story modal
  const closeStoryModal = () => {
    if (storyTimeout.current) clearTimeout(storyTimeout.current);
    if (storyAnimation.current) storyAnimation.current.stop();
    setStoryModalVisible(false);
    setCurrentBlogIndex(0);
    storyProgressValue.setValue(0);
    setIsPaused(false);
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
    } else {
      // Tap in the middle - pause/resume
      if (isPaused) {
        resumeStoryTimer();
      } else {
        pauseStoryTimer();
      }
    }
  };
  
  // Handle story long press
  const handleStoryLongPress = () => {
    if (!isPaused) {
      pauseStoryTimer();
    }
  };
  
  // Handle story press out
  const handleStoryPressOut = () => {
    if (isPaused) {
      resumeStoryTimer();
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
      <View style={homestyles.radioContainer}>
        {options.map((option) => (
          <TouchableOpacity 
            key={option}
            style={homestyles.radioOption}
            onPress={() => handleQuestionnaireAnswer(questionId, option)}
          >
            <View style={[
              homestyles.radioOuterCircle,
              questionnaireAnswers[questionId] === option && homestyles.radioOuterCircleSelected
            ]}>
              {questionnaireAnswers[questionId] === option && <View style={homestyles.radioInnerCircle} />}
            </View>
            <Text style={homestyles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  // Render slider
  const renderSlider = (min: number, max: number, questionId: string) => {
    const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    return (
      <View style={homestyles.sliderContainer}>
        <View style={homestyles.sliderValues}>
          {values.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                homestyles.sliderValue,
                questionnaireAnswers[questionId] === value && homestyles.sliderValueSelected
              ]}
              onPress={() => handleQuestionnaireAnswer(questionId, value)}
            >
              <Text style={[
                homestyles.sliderValueText,
                questionnaireAnswers[questionId] === value && homestyles.sliderValueTextSelected
              ]}>
                {value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={homestyles.sliderLabels}>
          <Text style={homestyles.sliderLabelText}>Low</Text>
          <Text style={homestyles.sliderLabelText}>High</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={homestyles.scrollContainer}>
      <View style={homestyles.container}>
        {/* Header Section */}
        <View style={homestyles.header}>
          <View style={homestyles.profileSection}>
            <Image source={profilePicUri ? { uri: profilePicUri } : require('../../assets/girl.jpg')} 
            style={homestyles.profilePic} />
            <View style={homestyles.headerTextContainer}>
            <Text style={homestyles.greeting}>{userName}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setSearchActive(true)}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Daily Challenge Section */}
        <TouchableOpacity 
          style={homestyles.challengeCard}
          onPress={() => setQuestionnaireVisible(true)}
        >
          <View style={homestyles.challengeTextContainer}>
            <Text style={homestyles.challengeTitle}>Daily challenge</Text>
            <Text style={homestyles.challengeDescription}>Your Personal Questionnaire</Text>
            
            <View style={homestyles.participantsContainer}>
              <Image source={require('../../assets/avatar.jpeg')} style={homestyles.participantAvatar} />
              <Image source={require('../../assets/avatar2.jpg')} style={[homestyles.participantAvatar, homestyles.participantOverlap]} />
              <Image source={require('../../assets/avatar3.jpg')} style={[homestyles.participantAvatar, homestyles.participantOverlap2]} />
              <View style={homestyles.moreParticipants}>
                <Text style={homestyles.moreParticipantsText}>+4</Text>
              </View>
            </View>
          </View>
          
          <View style={homestyles.challengeImageContainer}>
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
        <View style={homestyles.weekDaySelector}>
          {weekDays.map((item, index) => {
            // Calculate if this is today (index 3 in our array)
            const isToday = index === 3;
            
            return (
              <TouchableOpacity 
                key={item.day + item.date} 
                style={[
                  homestyles.dayItem, 
                  isToday && homestyles.selectedDayItem // Always highlight today
                ]}
                onPress={() => handleDaySelect(index)}
              >
                <Text 
                  style={[
                    homestyles.dayText, 
                    isToday && homestyles.selectedDayText
                  ]}
                >
                  {item.day}
                </Text>
                <Text 
                  style={[
                    homestyles.dateText, 
                    isToday && homestyles.selectedDateText
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Your Blogs Section */}
        <Text style={homestyles.sectionTitle}>Latest Blogs</Text>
        <View style={homestyles.blogGrid}>
          <TouchableOpacity 
            style={homestyles.largeBlog}
            onPress={() => openStoryModal(0)}
          >
            <Image source={blogData[0].image} style={homestyles.largeBlogImage} />
            <View style={homestyles.blogBadge}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={homestyles.smallBlogsContainer}>
            <TouchableOpacity 
              style={[homestyles.smallBlog, homestyles.firstSmallBlog]}
              onPress={() => openStoryModal(1)}
            >
              <Image source={blogData[1].image} style={homestyles.smallBlogImage} />
              <View style={homestyles.blogBadge}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={homestyles.smallBlog}
              onPress={() => openStoryModal(2)}
            >
              <Image source={blogData[2].image} style={homestyles.smallBlogImage} />
              <View style={homestyles.blogBadge}>
                <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spacer to Avoid Merging with Bottom Navigation */}
        <View style={{ height: 80 }} />
      </View>

      {/* Search Modal */}
      {searchActive && (
        <View style={homestyles.searchOverlay}>
          <View style={homestyles.searchContainer}>
            <TextInput
              style={homestyles.searchInput}
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
        <View style={homestyles.modalBackground}>
          <View style={homestyles.appointmentModal}>
            <Text style={homestyles.modalTitle}>Schedule Appointment</Text>
            <Text style={homestyles.appointmentDateText}>
              {selectedDate ? new Date(selectedDate).toDateString() : 'Select a date'}
            </Text>
            
            <Text style={homestyles.inputLabel}>Appointment Time</Text>
            <View style={homestyles.timeSelectionContainer}>
              {['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    homestyles.timeOption,
                    appointmentTime === time && homestyles.timeOptionSelected
                  ]}
                  onPress={() => setAppointmentTime(time)}
                >
                  <Text style={[
                    homestyles.timeOptionText,
                    appointmentTime === time && homestyles.timeOptionTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={homestyles.inputLabel}>Reason for Visit (Optional)</Text>
            <TextInput
              style={homestyles.reasonInput}
              placeholder="Enter reason for your appointment..."
              value={appointmentReason}
              onChangeText={setAppointmentReason}
              multiline
            />
            
            <View style={homestyles.modalButtons}>
              <TouchableOpacity
                style={[homestyles.modalButton, homestyles.cancelButton]}
                onPress={() => setAppointmentModalVisible(false)}
              >
                <Text style={homestyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[homestyles.modalButton, homestyles.confirmButton]}
                onPress={handleAppointmentSubmit}
              >
                <Text style={homestyles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Blog Story Modal with Instagram-like swipe behavior */}
      <Modal
        visible={storyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeStoryModal}
        statusBarTranslucent={true}
      >
        <View style={homestyles.storyModalContainer}>
          <TouchableOpacity
            style={homestyles.storyContainer}
            activeOpacity={1}
            onPress={handleStoryTap}
            onLongPress={handleStoryLongPress}
            onPressOut={handleStoryPressOut}
            delayLongPress={200}
          >
            {/* Progress bar */}
            <View style={homestyles.storyProgressContainer}>
              {blogData.map((_, index) => (
                <View key={index} style={homestyles.storyProgressBar}>
                  <Animated.View
                    style={[
                      homestyles.storyProgressFill,
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
            <View style={homestyles.storyHeader}>
              <View style={homestyles.storyProfile}>
                <Image source={require('../../assets/avatar.jpeg')} style={homestyles.storyProfileImage} />
                <View>
                  <Text style={homestyles.storyProfileName}>Health Blog</Text>
                  <Text style={homestyles.storyDate}>{blogData[currentBlogIndex].datePosted}</Text>
                </View>
              </View>
              <TouchableOpacity 
                onPress={closeStoryModal}
                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Story content with animation */}
            <Animated.View
              style={[
                homestyles.storyContentContainer,
                { transform: [{ translateX: swipeAnim }] }
              ]}
            >
              <Image 
                source={blogData[currentBlogIndex].image} 
                style={homestyles.storyImage} 
                resizeMode="cover"
              />
              <View style={homestyles.storyContentOverlay}>
                <Text style={homestyles.storyTitle}>{blogData[currentBlogIndex].title}</Text>
                <Text style={homestyles.storyContent}>{blogData[currentBlogIndex].content}</Text>
              </View>
            </Animated.View>
            
            {/* Visual tap indicators (invisible but help user understand tap zones) */}
            <View style={homestyles.tapIndicatorsContainer}>
              <View style={homestyles.tapLeft}>
                {isPaused && (
                  <View style={homestyles.pauseIndicator}>
                    <Ionicons name="play" size={40} color="rgba(255,255,255,0.7)" />
                  </View>
                )}
              </View>
              <View style={homestyles.tapCenter} />
              <View style={homestyles.tapRight} />
            </View>
            
            {/* Navigation indicators */}
            <View style={homestyles.navigationIndicators}>
              {currentBlogIndex > 0 && (
                <TouchableOpacity 
                  style={homestyles.navButtonLeft}
                  onPress={goToPrevStory}
                >
                  <Ionicons name="chevron-back" size={28} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              )}
              {currentBlogIndex < blogData.length - 1 && (
                <TouchableOpacity 
                  style={homestyles.navButtonRight}
                  onPress={goToNextStory}
                >
                  <Ionicons name="chevron-forward" size={28} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      
      {/* Health Questionnaire Modal */}
      <Modal
        visible={questionnaireVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setQuestionnaireVisible(false)}
      >
        <View style={homestyles.modalBackground}>
          <View style={homestyles.questionnaireModal}>
            <View style={homestyles.questionnaireHeader}>
              <Text style={homestyles.questionnaireTitle}>Daily Health Check</Text>
              <Text style={homestyles.questionnaireSubtitle}>
                Question {currentQuestionIndex + 1} of {questionnaireQuestions.length}
              </Text>
              <View style={homestyles.progressBar}>
                <View 
                  style={[
                    homestyles.progressFill, 
                    { width: `${((currentQuestionIndex + 1) / questionnaireQuestions.length) * 100}%` }
                  ]} 
                />
              </View>
            </View>
            
            <View style={homestyles.questionContainer}>
              <Text style={homestyles.questionText}>
                {questionnaireQuestions[currentQuestionIndex].question}
              </Text>
              
              {/* Render different input types based on question type */}
              {questionnaireQuestions[currentQuestionIndex].type === 'input' && (
                <TextInput
                style={homestyles.questionnaireInput}
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
            
            <View style={homestyles.questionnaireFooter}>
              <TouchableOpacity
                style={[homestyles.modalButton, homestyles.cancelButton]}
                onPress={() => setQuestionnaireVisible(false)}
              >
                <Text style={homestyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[homestyles.modalButton, homestyles.confirmButton]}
                onPress={goToNextQuestion}
                disabled={!questionnaireAnswers[questionnaireQuestions[currentQuestionIndex].id]}
              >
                <Text style={homestyles.confirmButtonText}>
                  {currentQuestionIndex < questionnaireQuestions.length - 1 ? 'Next' : 'Submit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HomeScreen;