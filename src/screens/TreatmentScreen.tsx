import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking, Alert } from 'react-native';
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
        return <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />;
      case 'upcoming':
        return <Ionicons name="time-outline" size={20} color="#FFC107" />;
      default:
        return <Ionicons name="ellipse-outline" size={20} color="#ccc" />;
    }
  };
  
  const handleContactClinic = () => {
    Linking.openURL('tel:+91-921003608');
  };
  
  const handleAddLog = () => {
    Alert.alert(
      "Log an item",
      "What would you like to log?",
      [
        { text: "Symptom", onPress: () => console.log("Log symptom") },
        { text: "Medication", onPress: () => console.log("Log medication") },
        { text: "Mood", onPress: () => console.log("Log mood") },
        { text: "Procedure", onPress: () => console.log("Log procedure") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };
  
  const showMedicationInfo = () => {
    Alert.alert(
      "Medication Information",
      "Taking medications on time has increased the chances by 80% of successful IVF outcomes.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };
  
  const showPhysicalMetrics = () => {
    Alert.alert(
      "Physical Health",
      "Today's logs show good physical health indicators. Your activity level has improved since yesterday.",
      [{ text: "View Details", onPress: () => console.log("View Details") }, 
       { text: "Close", style: "cancel" }]
    );
  };
  
  const showHormoneMetrics = () => {
    Alert.alert(
      "Hormone Levels",
      "Your hormone levels are within the optimal range. Estradiol: 225 pg/mL, FSH: 7.2 mIU/mL",
      [{ text: "View Details", onPress: () => console.log("View Details") }, 
       { text: "Close", style: "cancel" }]
    );
  };
  
  const showStressMetrics = () => {
    Alert.alert(
      "Stress Levels",
      "Your stress levels are low today. Continue practicing mindfulness techniques for optimal results.",
      [{ text: "View Details", onPress: () => console.log("View Details") }, 
       { text: "Close", style: "cancel" }]
    );
  };
  
  // Generate dots for circular progress
// Generate dots for circular progress with organic distribution
const generateDots = () => {
  const dots = [];
  const numDots = 120; // Increase number of dots for denser appearance
  const colors = ['#FFC107', '#E5B6F7', '#FF9AA2', '#FFCC80', '#c7ceea']; // Yellow, Purple, Pink, Light Blue
  
  for (let i = 0; i < numDots; i++) {
    // Add randomness to radius to create organic look
    const baseRadius = 90;
    const randomOffset = (Math.random() * 15) - 5; // -5 to +10 pixel offset
    const radius = baseRadius + randomOffset;
    
    // Add slight randomness to angle for less uniform distribution
    const angleOffset = (Math.random() * 0.1) - 0.05; // Small random angle offset
    const angle = ((i / numDots) * 2 * Math.PI) + angleOffset;
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Randomly select color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Vary dot size slightly
    const size = 4 + (Math.random() * 4); // 4-8px dots
    
    // Create a gradient effect around the circle
    // More opaque in the first 42% (completed), more transparent elsewhere
    const dotPosition = (i / numDots) % 1;
    let opacity;
    if (dotPosition < 0.42) { // 12 days out of 28 is approximately 0.42
      opacity = 0.8 + (Math.random() * 0.2); // 0.8-1.0 for completed section
    } else {
      opacity = 0.2 + (Math.random() * 0.3); // 0.2-0.5 for incomplete section
    }
    
    dots.push(
      <View
        key={i}
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: opacity,
          transform: [
            { translateX: x },
            { translateY: y }
          ]
        }}
      />
    );
  }
  return dots;
};
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with title and add icon only */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Treatment</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={handleAddLog}>
              <Ionicons name="add-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Cycle progress card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>Treatment Progress</Text>
          <Text style={styles.scoreSubtitle}>
            Excellent! You're on track with your IVF cycle.
          </Text>
          
          {/* Circular progress indicator with colored dots */}
          <View style={styles.circularProgressContainer}>
            <View style={styles.dotsCircle}>
              {generateDots()}
              <View style={styles.progressInnerCircle}>
                <View style={styles.progressValueContainer}>
                  <Text style={styles.progressValue}>12</Text>
                  <Text style={styles.progressLabel}>Day</Text>
                  <Text style={styles.dateRange}>of 28</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionLabel}>Today</Text>
        
        {/* Medication section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="medical-outline" size={18} color="#333" />
            </View>
            <Text style={styles.sectionTitle}>Medications</Text>
            <TouchableOpacity style={styles.infoButton} onPress={showMedicationInfo}>
              <Ionicons name="information-circle-outline" size={22} color="#888" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.medicationList}>
            {medications.map(med => (
              <TouchableOpacity
                key={med.id}
                style={styles.medicationItem}
                onPress={() => toggleMedicationStatus(med.id)}
              >
                <TouchableOpacity
                  style={[
                    styles.checkboxContainer,
                    med.taken && styles.checkboxChecked
                  ]}
                  onPress={() => toggleMedicationStatus(med.id)}
                >
                  {med.taken && <Ionicons name="checkmark" size={16} color="#fff" />}
                </TouchableOpacity>
                <View style={styles.medicationInfo}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDetails}>{med.dosage} • {med.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Treatment Phases */}
        <Text style={styles.sectionLabel}>Current Phase</Text>
        <View style={styles.phaseCard}>
          <View style={styles.phaseHeader}>
            <View style={[styles.phaseIcon, {backgroundColor: '#E5B6F7'}]}>
              <Ionicons name="flask-outline" size={18} color="#fff" />
            </View>
            <Text style={styles.phaseTitle}>Stimulation</Text>
          </View>
          <Text style={styles.phaseDescription}>
            Your ovaries are being stimulated to produce multiple eggs
          </Text>
        </View>
        
        {/* Treatment Steps */}
        <Text style={styles.sectionLabel}>Coming Up</Text>
        <View style={styles.eventsContainer}>
          {upcomingSteps.map((step, index) => (
            <View key={step.id} style={styles.eventItem}>
              <View style={styles.eventIconContainer}>
                {renderStatusIcon(step.status)}
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventName}>{step.name}</Text>
                <Text style={styles.eventDate}>{step.date}</Text>
              </View>
              {index < upcomingSteps.length - 1 && (
                <View style={styles.eventConnector} />
              )}
            </View>
          ))}
        </View>
        
        {/* Quick summary cards */}
        <Text style={styles.sectionLabel}>Health Metrics</Text>
        <View style={styles.metricsContainer}>
          <TouchableOpacity 
            style={[styles.metricCard, {backgroundColor: '#FFF9E6'}]}
            onPress={showPhysicalMetrics}
          >
            <View style={[styles.metricIcon, {backgroundColor: '#FFE082'}]}>
              <Ionicons name="body-outline" size={18} color="#333" />
            </View>
            <Text style={styles.metricTitle}>Physical</Text>
            <Text style={styles.metricValue}>Good</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.metricCard, {backgroundColor: '#F0E6FF'}]}
            onPress={showHormoneMetrics}
          >
            <View style={[styles.metricIcon, {backgroundColor: '#D8B9FF'}]}>
              <Ionicons name="water-outline" size={18} color="#333" />
            </View>
            <Text style={styles.metricTitle}>Hormones</Text>
            <Text style={styles.metricValue}>+2 units</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.metricCard, {backgroundColor: '#FFE6E9'}]}
            onPress={showStressMetrics}
          >
            <View style={[styles.metricIcon, {backgroundColor: '#FFBBC4'}]}>
              <Ionicons name="heart-outline" size={18} color="#333" />
            </View>
            <Text style={styles.metricTitle}>Stress</Text>
            <Text style={styles.metricValue}>Low</Text>
          </TouchableOpacity>
        </View>
        
        {/* Contact button */}
        <TouchableOpacity style={styles.contactButton} onPress={handleContactClinic}>
          <Ionicons name="call-outline" size={18} color="#fff" />
          <Text style={styles.contactButtonText}>Contact Clinic</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreSubtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: 200,
  },
  dotsCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressInnerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // Add subtle gradient effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  progressValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
  },
  dateRange: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 12,
    color: '#333',
  },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  infoButton: {
    padding: 5,
  },
  medicationList: {
    marginTop: 5,
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D8B9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  checkboxChecked: {
    backgroundColor: '#D8B9FF',
    borderColor: '#D8B9FF',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  medicationDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  phaseCard: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  phaseIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  phaseDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  eventsContainer: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  eventIconContainer: {
    marginRight: 15,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  eventConnector: {
    position: 'absolute',
    left: 10,
    top: 20,
    bottom: -5,
    width: 1,
    backgroundColor: '#eee',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  metricCard: {
    width: '31%',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#E86D6D',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default TreatmentScreen;