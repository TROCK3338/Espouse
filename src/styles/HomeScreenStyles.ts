import { StyleSheet } from 'react-native';

export const homestyles = StyleSheet.create({
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
        paddingTop: 10,
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
      // Blog Badge style used multiple times
  blogBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  
  // Story Modal Container
  storyModalContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  // Story Content Container with animation
  storyContentContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  // Tap Indicators Container
  tapIndicatorsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  
  // Tap Center for three-section tapping
  tapCenter: {
    flex: 1,
  },
  
  // Pause Indicator
  pauseIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Navigation Indicators
  navigationIndicators: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'box-none',
  },
  
  // Navigation Buttons
  navButtonLeft: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  navButtonRight: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});