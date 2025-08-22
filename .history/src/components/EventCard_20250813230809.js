import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EventCard = ({ event, onApply }) => {
  const getTopicIcon = (topic) => {
    switch (topic.toLowerCase()) {
      case 'career guidance':
        return '🎯';
      case 'technical workshops':
        return '💻';
      case 'soft skills':
        return '🤝';
      default:
        return '📚';
    }
  };

  const getTopicColor = (topic) => {
    switch (topic.toLowerCase()) {
      case 'career guidance':
        return '#E74C3C';
      case 'technical workshops':
        return '#3498DB';
      case 'soft skills':
        return '#2ECC71';
      default:
        return '#9B59B6';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isUpcoming = (dateString) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  return (
    <View style={styles.card}>
      {/* Header with topic and icon */}
      <View style={styles.cardHeader}>
        <View style={styles.topicContainer}>
          <View style={[styles.topicIcon, { backgroundColor: getTopicColor(event.topic) }]}>
            <Text style={styles.topicIconText}>{getTopicIcon(event.topic)}</Text>
          </View>
          <View style={styles.topicTextContainer}>
            <Text style={styles.topicTitle}>{event.topic}</Text>
            <Text style={styles.institutionName}>{event.institution.name}</Text>
          </View>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: isUpcoming(event.date) ? '#2ECC71' : '#95A5A6' }
          ]}>
            <Text style={styles.statusText}>
              {isUpcoming(event.date) ? 'Upcoming' : 'Past'}
            </Text>
          </View>
        </View>
      </View>

      {/* Event Details */}
      <View style={styles.cardBody}>
        {/* Date and Time */}
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>📅</Text>
            <Text style={styles.detailText}>{formatDate(event.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🕐</Text>
            <Text style={styles.detailText}>{event.time}</Text>
          </View>
        </View>

        {/* Location */}
        <View style={styles.detailRow}>
          <View style={[styles.detailItem, styles.fullWidth]}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>{event.location}</Text>
          </View>
        </View>

        {/* Participants */}
        <View style={styles.detailRow}>
          <View style={[styles.detailItem, styles.fullWidth]}>
            <Text style={styles.detailIcon}>👥</Text>
            <Text style={styles.detailText}>
              {event.participants.count} {event.participants.type}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{event.description}</Text>
        </View>
      </View>

      {/* Apply Button */}
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.applyButton} onPress={onApply}>
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#F8FBFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicIconText: {
    fontSize: 20,
  },
  topicTextContainer: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  institutionName: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  cardBody: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fullWidth: {
    flex: 1,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#34495E',
    fontWeight: '500',
    flex: 1,
  },
  descriptionContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECF0F1',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 14,
    color: '#5D6D7E',
    lineHeight: 20,
  },
  cardFooter: {
    padding: 16,
    backgroundColor: '#F8FBFF',
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventCard;