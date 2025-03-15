import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface NavigationBarProps {
  onTabPress: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState<string>('HOME');

  // Using chat and stethoscope icons but keeping the original structure
  const tabs = [
    { name: 'HOME', iconType: 'Ionicons', icon: 'home-outline', activeIcon: 'home' },
    { name: 'CHAT', iconType: 'Ionicons', icon: 'chatbubble-outline', activeIcon: 'chatbubble' },
    { name: 'TREAT', iconType: 'FontAwesome5', icon: 'stethoscope', activeIcon: 'stethoscope' },
    { name: 'PROFILE', iconType: 'Ionicons', icon: 'person-outline', activeIcon: 'person' }
  ];

  const handlePress = (tabName: string) => {
    setActiveTab(tabName);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
            {tab.iconType === 'FontAwesome5' ? (
              <FontAwesome5
                name={tab.icon}
                size={20}
                color={activeTab === tab.name ? "#000000" : "#FFFFFF"}
              />
            ) : (
              <Ionicons
                name={activeTab === tab.name ? tab.activeIcon : tab.icon}
                size={24}
                color={activeTab === tab.name ? "#000000" : "#FFFFFF"}
              />
            )}
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
    width: width * 0.75,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default NavigationBar;