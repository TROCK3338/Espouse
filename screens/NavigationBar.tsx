import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const tabs = [
  { name: 'HOME', icon: 'home-outline' },
  { name: 'CHAT', icon: 'chatbubbles-outline' },
  { name: 'TREAT', icon: 'heart-circle-outline' }, // Changed to ios-medical as an alternative
  { name: 'PROFILE', icon: 'person-outline' },
];

const NavigationBar = ({ onTabPress }: { onTabPress: (tab: string) => void }) => {
  const [activeTab, setActiveTab] = useState('HOME');
  const animations = tabs.map(() => new Animated.Value(0));

  const handlePress = (tabName: string, index: number) => {
    setActiveTab(tabName);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.parallel(
      animations.map((anim, i) =>
        Animated.timing(anim, {
          toValue: i === index ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        })
      )
    ).start();

    onTabPress(tabName);
  };

  return (
    <View style={styles.navWrapper}>
      <View style={styles.navBar}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              onPress={() => handlePress(tab.name, index)}
              activeOpacity={0.7}
              style={isActive ? styles.activeTab : styles.inactiveTab}
            >
              <Ionicons
                name={tab.icon as any}
                size={28}
                color={isActive ? '#FFFFFF' : '#6A4C93'}
              />
              {isActive && <Text style={styles.activeLabel}>{tab.name}</Text>}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navWrapper: {
    position: 'absolute',
    bottom: 20,
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 40,
    backgroundColor: '#fff',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 135, 228, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inactiveTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeLabel: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default NavigationBar;