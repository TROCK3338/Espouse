import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

interface NavigationBarProps {
  onTabPress: (tab: string) => void;
}

interface TabItem {
  name: string;
  icon: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onTabPress }) => {
  const [activeTab, setActiveTab] = useState<string>('HOME');

  const tabs: TabItem[] = [
    { name: 'HOME', icon: 'https://cdn-icons-png.flaticon.com/128/9643/9643115.png' },
    { name: 'CHAT', icon: 'https://cdn-icons-png.flaticon.com/128/2652/2652175.png' },
    { name: 'TREAT', icon: 'https://cdn-icons-png.flaticon.com/128/13606/13606217.png' },
    { name: 'PROFILE', icon: 'https://cdn-icons-png.flaticon.com/128/8162/8162975.png' }
  ];

  const handlePress = (tabName: string) => {
    setActiveTab(tabName);
    onTabPress(tabName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;

          return (
            <View key={tab.name} style={styles.tabContainer}>
              {isActive ? (
                <View style={styles.activeTabBackground}>
                  <TouchableOpacity
                    style={styles.tabButtonActive}
                    onPress={() => handlePress(tab.name)}
                    activeOpacity={0.7}
                  >
                    <Image source={{ uri: tab.icon }} style={styles.iconActive} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.tabButton}
                  onPress={() => handlePress(tab.name)}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: tab.icon }} style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
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
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
  },
  activeTabBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  iconActive: {
    width: 26,
    height: 26,
    tintColor: '#000000',
  }
});

export default NavigationBar;