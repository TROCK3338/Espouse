import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [following, setFollowing] = useState(72);
  const [followers, setFollowers] = useState(162);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Basic Info */}
        <View style={styles.profileBasic}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sarah Johnson</Text>
            <Text style={styles.profileLocation}>California, USA</Text>
          </View>
        </View>

        {/* Follow Stats */}
        <View style={styles.followStats}>
          <View style={styles.followColumn}>
            <Text style={styles.followLabel}>Follow</Text>
            <Text style={styles.followCount}>{following}</Text>
          </View>
          <View style={styles.followColumn}>
            <Text style={styles.followLabel}>Followers</Text>
            <Text style={styles.followCount}>{followers}</Text>
          </View>
          <View style={styles.followActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="pencil-outline" size={22} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Health Stats Cards */}
        <View style={styles.healthStatsContainer}>
          <View style={[styles.healthCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.healthCardLabel}>Start weight</Text>
            <Text style={styles.healthCardValue}>68.5<Text style={styles.healthCardUnit}>kg</Text></Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: '#E0F7FA' }]}>
            <Text style={styles.healthCardLabel}>Goal</Text>
            <Text style={styles.healthCardValue}>64.0<Text style={styles.healthCardUnit}>kg</Text></Text>
          </View>
          
          <View style={[styles.healthCard, { backgroundColor: '#FFF8E1' }]}>
            <Text style={styles.healthCardLabel}>Calories</Text>
            <Text style={styles.healthCardValue}>182<Text style={styles.healthCardUnit}> kcal</Text></Text>
          </View>
        </View>

        {/* Treatment Progress */}
        <View style={styles.progressSection}>
          <View style={styles.sectionWithIcon}>
            <Ionicons name="fitness-outline" size={22} color="#666" />
            <View style={styles.sectionContent}>
              <View style={styles.sectionTitleRow}>
                <Text style={styles.sectionTitle}>IVF Progress</Text>
                <Text style={styles.sectionSubtitle}>Day 42</Text>
              </View>
              <Text style={styles.progressDescription}>Stimulation phase</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </View>
        </View>

        {/* List Items */}
        <View style={styles.listContainer}>
          {/* Activity */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="pulse-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Physical activity</Text>
              <Text style={styles.listSubtitle}>Last activity: 2 days ago</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Statistics */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="stats-chart-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Statistics</Text>
              <Text style={styles.listSubtitle}>Cycle length: 28 days</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Appointments */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="calendar-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Appointments</Text>
              <Text style={styles.listSubtitle}>Next: March 15, 09:30 AM</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Medications */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="medical-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Medications</Text>
              <Text style={styles.listSubtitle}>4 active prescriptions</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Personal Information */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="person-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Personal Information</Text>
              <Text style={styles.listSubtitle}>Age: 34, BMI: 24.5</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>

          {/* Community */}
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Ionicons name="people-outline" size={22} color="#666" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>Community</Text>
              <Text style={styles.listSubtitle}>Connect with others</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Bottom spacing for navigation bar */}
        <View style={styles.navigationBarSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  settingsButton: {
    padding: 8,
  },
  profileBasic: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    marginLeft: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  profileLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  followStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  followColumn: {
    marginRight: 40,
  },
  followLabel: {
    fontSize: 14,
    color: '#777',
  },
  followCount: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  followActions: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  healthStatsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  healthCard: {
    borderRadius: 16,
    padding: 6,
    marginHorizontal: 5,
    marginBottom: 10,
    minWidth: 100,
  },
  healthCardLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  healthCardValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  healthCardUnit: {
    fontSize: 16,
    fontWeight: '400',
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  sectionWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 15,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  progressDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  listContent: {
    flex: 1,
    marginLeft: 15,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  listSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  navigationBarSpace: {
    height: 100,
  },
});

export default ProfileScreen;