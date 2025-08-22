import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../components/EventCard';
import { registerForEvent } from '../api/sme';
import { getSMEId, storeSMEId, clearAllData } from '../utils/storage';

export default function SMEDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [smeId, setSmeId] = useState(null);

  // Dummy data for events - replace with actual API call later
  const dummyEvents = [
    {
      _id: '507f1f77bcf86cd799439011',
      topic: 'Career Guidance',
      description: 'Comprehensive career guidance session for students exploring various career paths in technology and engineering fields.',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Main Auditorium, Block A',
      participants: {
        type: 'Students',
        count: 150,
      },
      institution: {
        _id: '507f1f77bcf86cd799439012',
        name: 'Delhi Technical University',
      },
    },
    {
      _id: '507f1f77bcf86cd799439013',
      topic: 'Technical Workshops',
      description: 'Hands-on workshop on modern web development technologies including React, Node.js, and cloud deployment strategies.',
      date: '2024-02-18',
      time: '2:00 PM',
      location: 'Computer Lab, Block B',
      participants: {
        type: 'Engineering Students',
        count: 50,
      },
      institution: {
        _id: '507f1f77bcf86cd799439014',
        name: 'Indian Institute of Technology',
      },
    },
    {
      _id: '507f1f77bcf86cd799439015',
      topic: 'Soft Skills',
      description: 'Interactive session on communication skills, leadership development, and professional etiquette for career success.',
      date: '2024-02-20',
      time: '11:00 AM',
      location: 'Conference Hall, Block C',
      participants: {
        type: 'Final Year Students',
        count: 100,
      },
      institution: {
        _id: '507f1f77bcf86cd799439016',
        name: 'Jawaharlal Nehru University',
      },
    },
    {
      _id: '507f1f77bcf86cd799439017',
      topic: 'Career Guidance',
      description: 'Specialized guidance session for students interested in pursuing careers in data science and artificial intelligence.',
      date: '2024-02-22',
      time: '9:30 AM',
      location: 'Seminar Hall, Block D',
      participants: {
        type: 'Computer Science Students',
        count: 80,
      },
      institution: {
        _id: '507f1f77bcf86cd799439018',
        name: 'Birla Institute of Technology',
      },
    },
    {
      _id: '507f1f77bcf86cd799439019',
      topic: 'Technical Workshops',
      description: 'Workshop on mobile app development using React Native and Flutter, covering both iOS and Android platforms.',
      date: '2024-02-25',
      time: '1:30 PM',
      location: 'Innovation Lab, Block E',
      participants: {
        type: 'Mobile Development Enthusiasts',
        count: 60,
      },
      institution: {
        _id: '507f1f77bcf86cd799439020',
        name: 'National Institute of Technology',
      },
    },
    {
      _id: '507f1f77bcf86cd799439021',
      topic: 'Soft Skills',
      description: 'Workshop on time management, stress handling, and work-life balance for students entering the professional world.',
      date: '2024-02-28',
      time: '3:00 PM',
      location: 'Student Center, Block F',
      participants: {
        type: 'All Students',
        count: 200,
      },
      institution: {
        _id: '507f1f77bcf86cd799439022',
        name: 'All India Institute of Medical Sciences',
      },
    },
  ];

  useEffect(() => {
    loadEvents();
    loadSmeId();
  }, []);

  const loadEvents = () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setEvents(dummyEvents);
      setLoading(false);
    }, 1000);
  };

  const loadSmeId = async () => {
    try {
      let smeId = await getSMEId();
      if (!smeId) {
        // If no SME ID is stored, create a dummy one for demo purposes
        smeId = '507f1f77bcf86cd799439099';
        await storeSMEId(smeId);
      }
      setSmeId(smeId);
    } catch (error) {
      console.error('Error loading SME ID:', error);
      // Fallback to dummy ID
      setSmeId('507f1f77bcf86cd799439099');
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadEvents();
      setRefreshing(false);
    }, 1000);
  };

  const handleApplyForEvent = async (eventId) => {
    if (!smeId) {
      Alert.alert('Error', 'SME ID not found. Please login again.');
      return;
    }

    try {
      Alert.alert(
        'Confirm Application',
        'Are you sure you want to apply for this event?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Apply',
            onPress: async () => {
              try {
                // Uncomment when API is ready
                // await registerForEvent(eventId, smeId);
                
                // For now, just show success message
                Alert.alert('Success', 'Your application has been submitted successfully!');
              } catch (error) {
                Alert.alert('Error', 'Failed to submit application. Please try again.');
                console.error('Error applying for event:', error);
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error('Error in handleApplyForEvent:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              if (onLogout) {
                onLogout();
              }
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft} />
          <View style={styles.headerCenter}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>📚</Text>
            </View>
            <Text style={styles.headerTitle}>SME Dashboard</Text>
            <Text style={styles.headerSubtitle}>Discover relevant events and opportunities</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Events List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
      >
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Available Events</Text>
          <Text style={styles.sectionSubtitle}>
            {events.length} events available for application
          </Text>

          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onApply={() => handleApplyForEvent(event._id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Light blue background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#4A90E2',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconText: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  eventsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
});