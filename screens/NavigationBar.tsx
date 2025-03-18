import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

interface NavigationBarProps {
  onTabPress: (tab: string) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState<string>('HOME');

  // Using chat and stethoscope icons but keeping the original structure
  const tabs = [
    { name: 'HOME', iconType: 'MaterialCommunityIcons', icon: 'home-analytics', activeIcon: 'home-analytics' },
    { name: 'CHAT', iconType: 'Fontisto', icon: 'hipchat', activeIcon: 'hipchat' },
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
  <FontAwesome5 name={tab.icon} size={28} color={activeTab === tab.name ? "#000000" : "#FFFFFF"} />
) : tab.iconType === 'MaterialCommunityIcons' ? (
  <MaterialCommunityIcons name={tab.icon as any} size={40} color={activeTab === tab.name ? "#000000" : "#FFFFFF"} />
) : tab.iconType === 'Ionicons' ? (
  <Ionicons name={tab.icon as any} size={32} color={activeTab === tab.name ? "#000000" : "#FFFFFF"} />
) : tab.iconType === 'Fontisto' ? (
  <Fontisto name={tab.icon as any} size={30} color={activeTab === tab.name ? "#000000" : "#FFFFFF"} />
) : (
  <MaterialIcons name={tab.icon as any} size={30} color={activeTab === tab.name ? "#000000" : "#FFFFFF"} />
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
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 15,
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