import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Define proper types for the props to match your original component
interface NavigationBarProps {
  onTabPress: (tab: string) => void;
}

// Define tab type for better type safety
interface TabItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  // Using the same tab names as in your original code
  const [activeTab, setActiveTab] = useState<string>('HOME');
  
  // Maintain your original tab names but update the styling
  const tabs: TabItem[] = [
    { name: 'HOME', icon: 'home-outline', activeIcon: 'home' },
    { name: 'CHAT', icon: 'grid-outline', activeIcon: 'grid' },
    { name: 'TREAT', icon: 'heart-circle-outline', activeIcon: 'heart-circle' },
    { name: 'PROFILE', icon: 'person-outline', activeIcon: 'person' }
  ];

  const handlePress = (tabName: string) => {
    setActiveTab(tabName);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Call the onTabPress with the tab name string to match your original implementation
    onTabPress(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[
              styles.tabButton,
              activeTab === tab.name && styles.activeTabButton
            ]}
            onPress={() => handlePress(tab.name)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={activeTab === tab.name ? tab.activeIcon : tab.icon}
              size={24}
              color={activeTab === tab.name ? "#000000" : "#FFFFFF"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: width * 0.85,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
});

export default NavigationBar;