import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Sarah Johnson</Text>
        <Text style={styles.subtitle}>IVF Journey: Day 42</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoItem}>
          <Ionicons name="calendar-outline" size={24} color="#8087E4" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>34 years</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="medical-outline" size={24} color="#8087E4" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Treatment Phase</Text>
            <Text style={styles.infoValue}>Stimulation</Text>
          </View>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="fitness-outline" size={24} color="#8087E4" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>BMI</Text>
            <Text style={styles.infoValue}>24.5</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentDate}>
            <Text style={styles.appointmentDay}>15</Text>
            <Text style={styles.appointmentMonth}>MAR</Text>
          </View>
          <View style={styles.appointmentDetails}>
            <Text style={styles.appointmentTitle}>Ultrasound Check</Text>
            <Text style={styles.appointmentTime}>
              <Ionicons name="time-outline" size={16} color="#8087E4" /> 09:30 AM
            </Text>
            <Text style={styles.appointmentDoctor}>
              <Ionicons name="person-outline" size={16} color="#8087E4" /> Dr. Rebecca White
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="notifications-outline" size={24} color="#8087E4" />
          <Text style={styles.settingsLabel}>Notifications</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" style={styles.settingsArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="lock-closed-outline" size={24} color="#8087E4" />
          <Text style={styles.settingsLabel}>Privacy</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" style={styles.settingsArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="help-circle-outline" size={24} color="#8087E4" />
          <Text style={styles.settingsLabel}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#CCC" style={styles.settingsArrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Ionicons name="log-out-outline" size={24} color="#E86D6D" />
          <Text style={[styles.settingsLabel, {color: '#E86D6D'}]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Espouse v1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#8087E4',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#8087E4',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    overflow: 'hidden',
  },
  appointmentDate: {
    backgroundColor: '#8087E4',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
  },
  appointmentDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  appointmentMonth: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  appointmentDetails: {
    flex: 1,
    padding: 15,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appointmentDoctor: {
    fontSize: 14,
    color: '#666',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingsLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    flex: 1,
  },
  settingsArrow: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 100,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
});

export default ProfileScreen;