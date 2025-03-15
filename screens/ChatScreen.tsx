import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, KeyboardAvoidingView, Platform, SafeAreaView 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatScreen = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatActive, setChatActive] = useState(false);

  const faqs = [
    { id: '1', text: '🍼 What are the IVF success rates?' },
    { id: '2', text: '💊 How do I manage IVF medications?' },
    { id: '3', text: '🗓️ What is the IVF timeline?' },
    { id: '4', text: '🥗 What diet helps during IVF?' },
    { id: '5', text: '❤️ How to stay stress-free?' }
  ];

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

    // Simulated assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help! Let me provide some insights.",
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient colors={['#E3F2FD', '#FCE4EC']} style={styles.gradient}>
        
        {/* Centered Logo + Title */}
        {!chatActive && (
          <View style={styles.header}>
            <MaterialCommunityIcons name="feather" size={50} color="#FF4081" />
            <Text style={styles.headerTitle}>IVF Support Chat</Text>
          </View>
        )}

        {/* FAQs Section */}
        {!chatActive && (
          <View style={styles.faqContainer}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
            {faqs.map((faq) => (
              <TouchableOpacity 
                key={faq.id} 
                style={styles.faqButton} 
                onPress={() => {
                  setChatActive(true);
                  sendMessage(faq.text);
                }}
              >
                <Text style={styles.faqText}>{faq.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Search Button to Enter Chat */}
        {!chatActive && (
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={() => setChatActive(true)}
          >
            <Text style={styles.searchText}>SEARCH 🔍</Text>
          </TouchableOpacity>
        )}

        {/* Chat Window */}
        {chatActive && (
          <>
            <FlatList
              data={messages}
              renderItem={({ item }) => (
                <View style={[
                  styles.messageBubble, 
                  item.sender === 'user' ? styles.userMessage : styles.assistantMessage
                ]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text style={styles.timestamp}>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.messageList}
              inverted
            />

            {/* Chat Input */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.inputContainer}
            >
              <TextInput
                style={styles.input}
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => sendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
              >
                <Ionicons name="send" size={24} color={!inputMessage.trim() ? '#CCC' : '#FF4081'} />
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
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
    backgroundColor: '#FF4081',
    padding: 14,
    borderRadius: 24,
    marginTop: 20,
    width: '60%',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  messageList: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 8,
  },
  userMessage: {
    backgroundColor: '#FF4081',
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
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 8,
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
  sendButton: {
    padding: 8,
    borderRadius: 20,
  },
});

export default ChatScreen;