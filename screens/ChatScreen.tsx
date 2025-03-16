import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  FlatList, KeyboardAvoidingView, Platform, SafeAreaView,
  StatusBar, Image, ScrollView
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}




// IVF FAQ Response Database
const ivfResponses = {
  success: `IVF success rates vary based on age, medical history, and clinic. Overall rates:
- Under 35: ~55% per embryo transfer
- 35-37: ~40% per transfer
- 38-40: ~25-30% per transfer
- Over 40: ~5-15% per transfer

Multiple factors affect success including egg quality, sperm quality, and uterine conditions. Would you like specific information about your situation?`,

  medications: `Managing IVF medications involves:

1. Keeping a detailed schedule
2. Storing medications properly (some need refrigeration)
3. Learning proper injection techniques
4. Tracking side effects
5. Having emergency contacts ready

Common medications include:
- GnRH agonists/antagonists (Lupron, Cetrotide)
- FSH/LH stimulants (Gonal-F, Menopur)
- Trigger shots (Ovidrel, HCG)
- Progesterone supplements

I can provide more detailed information about specific medications if needed.`,

  timeline: `A typical IVF timeline:

1. Preparation phase (2-4 weeks): Testing and birth control pills
2. Ovarian stimulation (8-14 days): Daily hormone injections
3. Egg retrieval (15-30 min procedure)
4. Fertilization (1 day)
5. Embryo culture (3-5 days)
6. Embryo transfer (15-20 min procedure)
7. Two-week wait before pregnancy test

The entire process typically takes 6-8 weeks from start to pregnancy test. Would you like more details about any specific phase?`,

  diet: `Diet recommendations during IVF include:

- Mediterranean diet rich in fruits, vegetables, whole grains
- Lean proteins (fish, chicken, plant-based options)
- Healthy fats (avocados, olive oil, nuts)
- Staying well hydrated
- Moderate consumption of full-fat dairy
- Limiting caffeine to 200mg daily
- Avoiding alcohol completely
- Limiting processed foods and added sugars

Many doctors also recommend prenatal vitamins with folic acid and vitamin D supplements. Would you like specific meal suggestions?`,

  stress: `Managing stress during IVF treatment:

1. Mind-body techniques: meditation, yoga, deep breathing
2. Professional support: counseling, therapy, support groups
3. Physical activity: moderate exercise like walking
4. Self-care: massages, acupuncture, adequate sleep
5. Communication: open dialogue with partner and medical team
6. Setting boundaries: limiting stressful commitments
7. Journaling: expressing feelings and tracking your journey

Remember that stress management is personal - find what works for you. Would you like more details on any of these approaches?`
};

const IVFChatScreen = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatActive, setChatActive] = useState(false);
  const [userName, setUserName] = useState('Jessica');
  const flatListRef = useRef<FlatList>(null);
  //typing the inputRef
const inputRef = useRef<TextInput>(null);

  // Initial greeting message when chat becomes active
  useEffect(() => {
    if (chatActive && messages.length === 0) {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: `Hi ${userName}, I'm NOVA, your IVF support assistant. How may I help you today?`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages([assistantMessage]);
    }
  }, [chatActive]);

  const faqs = [
    { id: '1', text: '🍼 What are the IVF success rates?' },
    { id: '2', text: '💊 How do I manage IVF medications?' },
    { id: '3', text: '🗓️ What is the IVF timeline?' },
    { id: '4', text: '🥗 What diet helps during IVF?' },
    { id: '5', text: '❤️ How to stay stress-free?' }
  ];

  // Function to get appropriate response based on message content
  const getResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('success') || lowerQuestion.includes('rate')) {
      return ivfResponses.success;
    } else if (lowerQuestion.includes('medication') || lowerQuestion.includes('inject') || lowerQuestion.includes('drug')) {
      return ivfResponses.medications;
    } else if (lowerQuestion.includes('timeline') || lowerQuestion.includes('schedule') || lowerQuestion.includes('process')) {
      return ivfResponses.timeline;
    } else if (lowerQuestion.includes('diet') || lowerQuestion.includes('food') || lowerQuestion.includes('eat')) {
      return ivfResponses.diet;
    } else if (lowerQuestion.includes('stress') || lowerQuestion.includes('anxiety') || lowerQuestion.includes('worry')) {
      return ivfResponses.stress;
    } else {
      return "I'm here to help with your IVF journey. Could you please provide more details about your question? I can answer questions about success rates, medications, timeline, diet recommendations, and stress management during IVF treatment.";
    }
  };

  const sendMessage = (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get appropriate response
    setTimeout(() => {
      const responseText = getResponse(messageText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  // Homepage design
  const HomeScreen = () => (
    <View style={styles.homeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat with our support team</Text>
      </View>
      
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>How can we help you?</Text>
        <Text style={styles.heroSubtitle}>
          We are available 24/7 to help clarify any confusion you have on our product and ensure that you have a seamless experience through the process
        </Text>
      </View>
      
      <View style={styles.emailSection}>
        <View style={styles.emailIconContainer}>
          <MaterialCommunityIcons name="email-outline" size={36} color="#9C8EBC" />
        </View>
        <Text style={styles.emailTitle}>Send us an email;</Text>
        <Text style={styles.emailAddress}>info@ivfsupport.io</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.liveChatButton}
        onPress={() => setChatActive(true)}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" style={styles.chatIcon} />
        <Text style={styles.liveChatText}>Contact Live Chat</Text>
        <Ionicons name="chevron-forward" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  // Chat interface
  const ChatInterface = () => (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => setChatActive(false)}>
          <View style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.chatHeaderTitle}>Chat with NOVA</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.onlineStatus}>
        <Text style={styles.onlineText}>Online</Text>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble, 
            item.sender === 'user' ? styles.userMessage : styles.assistantMessage
          ]}>
            <Text style={[
              styles.messageText,
              item.sender === 'user' ? styles.userMessageText : styles.assistantMessageText
            ]}>{item.text}</Text>
            <View style={styles.messageFooter}>
              {item.sender === 'assistant' && (
                <Text style={styles.senderName}>NOVA</Text>
              )}
              {item.sender === 'user' && (
                <Text style={styles.senderName}>{userName}</Text>
              )}
              <Text style={styles.timestamp}>
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => {
          if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({animated: true});
          }
        }}
      />
      
      {/* Chat Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Adjust this value based on your navBar ht
        style={styles.inputContainer}
      >
        <TextInput
  ref={inputRef}
  style={styles.input}
  value={inputMessage}
  onChangeText={setInputMessage}
  placeholder="Type your message..."
  placeholderTextColor="#999"
  multiline
  blurOnSubmit={false} // Add this to prevent auto-blur
  autoCorrect={false} // Optional: disable autocorrect which may cause focus issues
/>
        <View style={styles.inputActions}>
          <TouchableOpacity style={styles.attachButton}>
            <Feather name="paperclip" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={() => sendMessage(inputMessage)}
            disabled={!inputMessage.trim()}
          >
            <FontAwesome5 name="paper-plane" size={20} color={!inputMessage.trim() ? '#CCC' : '#9C8EBC'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F0FF" />
      <LinearGradient colors={['#F5F0FF', '#F5F0FF']} style={styles.gradient}>
        {chatActive ? <ChatInterface /> : <HomeScreen />}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0FF',
  },
  gradient: {
    flex: 1,
  },
  // Home screen styles
  homeContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  emailSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emailIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(156, 142, 188, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  emailTitle: {
    fontSize: 18,
    color: '#444',
    marginBottom: 5,
  },
  emailAddress: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  liveChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatIcon: {
    marginRight: 10,
  },
  liveChatText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  activeNavText: {
    color: '#9C8EBC',
  },
  
  // Chat interface styles
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5F0FF',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#9C8EBC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  onlineStatus: {
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  onlineText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  messageList: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 8,
  },
  userMessage: {
    backgroundColor: '#9C8EBC',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  assistantMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFF',
  },
  assistantMessageText: {
    color: '#333',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 80,
    left: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    borderRadius: 20,
  },
  
  // FAQ styles from original code
  faqContainer: {
    width: '90%',
    padding: 15,
  },
  faqTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  faqButton: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqText: {
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#9C8EBC',
    padding: 14,
    borderRadius: 24,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default IVFChatScreen;