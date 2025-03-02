import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample data
const medicationData = [
  { id: '1', name: 'Gonal-F', dosage: '300 IU', time: '8:00 PM', taken: false },
  { id: '2', name: 'Cetrotide', dosage: '0.25 mg', time: '8:00 AM', taken: true },
  { id: '3', name: 'Progesterone', dosage: '200 mg', time: '9:00 PM', taken: false },
];

const upcomingSteps = [
  { id: '1', name: 'Egg Retrieval', date: 'Mar 18, 2025', status: 'upcoming' },
  { id: '2', name: 'Embryo Transfer', date: 'Mar 25, 2025', status: 'upcoming' },
  { id: '3', name: 'Pregnancy Test', date: 'Apr 8, 2025', status: 'upcoming' },
];

const TreatmentScreen = () => {
  const [expandedSection, setExpandedSection] = useState<string>('medications');
  const [medications, setMedications] = useState(medicationData);

  const toggleMedicationStatus = (id: string) => {
    setMedications(
      medications.map(med => 
        med.id === id ? { ...med, taken: !med.taken } : med
      )
    );
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />;
      case 'upcoming':
        return <Ionicons name="time-outline" size={24} color="#FFC107" />;
      default:
        return <Ionicons name="ellipse-outline" size={24} color="#999" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Treatment Plan</Text>
        <Text style={styles.headerSubtitle}>Cycle Day 12 of 28</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '43%' }]} />
        </View>
        <Text style={styles.progressText}>43% Complete</Text>
      </View>
      
      {/* Current Phase */}
      <View style={styles.phaseContainer}>
        <View style={styles.phaseIcon}>
          <Ionicons name="flask-outline" size={28} color="#FFF" />
        </View>
        <View style={styles.phaseContent}>
          <Text style={styles.phaseTitle}>Stimulation Phase</Text>
          <Text style={styles.phaseDescription}>
            Your ovaries are being stimulated to produce multiple eggs
          </Text>
        </View>
      </View>

      {/* Expandable Sections */}
      <TouchableOpacity 
        style={[
          styles.sectionHeader, 
          expandedSection === 'medications' && styles.activeSectionHeader
        ]}
        onPress={() => setExpandedSection(expandedSection === 'medications' ? '' : 'medications')}
      >
        <Ionicons name="medkit-outline" size={24} color={expandedSection === 'medications' ? '#FFF' : '#8087E4'} />
        <Text style={[
          styles.sectionTitle,
          expandedSection === 'medications' && styles.activeSectionTitle
        ]}>Today's Medications</Text>
        <Ionicons 
          name={expandedSection === 'medications' ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={expandedSection === 'medications' ? '#FFF' : '#8087E4'} 
        />
      </TouchableOpacity>
      
      {expandedSection === 'medications' && (
        <View style={styles.sectionContent}>
          {medications.map(med => (
            <TouchableOpacity 
              key={med.id} 
              style={styles.medicationItem}
              onPress={() => toggleMedicationStatus(med.id)}
            >
              <Ionicons 
                name={med.taken ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={med.taken ? "#4CAF50" : "#999"} 
              />
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{med.name}</Text>
                <Text style={styles.medicationDetails}>
                  {med.dosage} • {med.time}
                </Text>
              </View>
              <Ionicons name="information-circle-outline" size={24} color="#8087E4" />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={[
          styles.sectionHeader, 
          expandedSection === 'steps' && styles.activeSectionHeader
        ]}
        onPress={() => setExpandedSection(expandedSection === 'steps' ? '' : 'steps')}
      >
        <Ionicons name="git-branch-outline" size={24} color={expandedSection === 'steps' ? '#FFF' : '#8087E4'} />
        <Text style={[
          styles.sectionTitle,
          expandedSection === 'steps' && styles.activeSectionTitle
        ]}>Treatment Steps</Text>
        <Ionicons 
          name={expandedSection === 'steps' ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={expandedSection === 'steps' ? '#FFF' : '#8087E4'} 
        />
      </TouchableOpacity>
      
      {expandedSection === 'steps' && (
        <View style={styles.sectionContent}>
          {upcomingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepItem}>
              {renderStatusIcon(step.status)}
              <View style={styles.stepInfo}>
                <Text style={styles.stepName}>{step.name}</Text>
                <Text style={styles.stepDate}>{step.date}</Text>
              </View>
              {index < upcomingSteps.length - 1 && (
                <View style={styles.stepConnector} />
              )}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity 
        style={[
          styles.sectionHeader, 
          expandedSection === 'symptoms' && styles.activeSectionHeader
        ]}
        onPress={() => setExpandedSection(expandedSection === 'symptoms' ? '' : 'symptoms')}
      >
        <Ionicons name="pulse-outline" size={24} color={expandedSection === 'symptoms' ? '#FFF' : '#8087E4'} />
        <Text style={[
          styles.sectionTitle,
          expandedSection === 'symptoms' && styles.activeSectionTitle
        ]}>Symptom Tracking</Text>
        <Ionicons 
          name={expandedSection === 'symptoms' ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={expandedSection === 'symptoms' ? '#FFF' : '#8087E4'} 
        />
      </TouchableOpacity>
      
      {expandedSection === 'symptoms' && (
        <View style={styles.sectionContent}>
          <TouchableOpacity style={styles.addSymptomButton}>
            <Ionicons name="add-circle-outline" size={24} color="#8087E4" />
            <Text style={styles.addSymptomText}>Track a new symptom</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.emergencyButton}>
          <Ionicons name="call-outline" size={24} color="#FFF" />
          <Text style={styles.emergencyButtonText}>Contact Clinic</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#8087E4',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  progressContainer: {
    margin: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8087E4',
  },
  progressText: {
    textAlign: 'right',
    color: '#666',
    marginTop: 5,
    fontSize: 14,
  },
  phaseContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    margin: 15,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  phaseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8087E4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  phaseContent: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    margin: 15,
    // marginBottom: expandedSection === 'medications' || expandedSection === 'steps' || expandedSection === 'symptoms' ? 0 : 15, // Update this line
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeSectionHeader: {
    backgroundColor: '#8087E4',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginLeft: 15,
  },
  activeSectionTitle: {
    color: '#FFF',
  },
  sectionContent: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: 15,
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  stepItem: {
    flexDirection: 'row',
    position: 'relative',
    paddingVertical: 15,
  },
  stepInfo: {
    flex: 1,
    marginLeft: 15,
  },
  stepName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  stepDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  stepConnector: {
    position: 'absolute',
    left: 12,
    top: 42,
    bottom: 0,
    width: 2,
    backgroundColor: '#E0E0E0',
  },
  addSymptomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  addSymptomText: {
    fontSize: 16,
    color: '#8087E4',
    marginLeft: 10,
  },
  footer: {
    padding: 15,
    marginBottom: 100,
    alignItems: 'center',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E86D6D',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  emergencyButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default TreatmentScreen;