import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateRequestScreen = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [participants, setParticipants] = useState('');
  const [targetGroup, setTargetGroup] = useState('');

  const handleSubmit = () => {
    // Validation logic here
    const requestData = {
      topic,
      description,
      date: date.toDateString(),
      time: time.toLocaleTimeString(),
      participants,
      targetGroup,
    };
    console.log('Submitted Data:', requestData);

    // API call to backend goes here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Event Request</Text>

      <TextInput
        style={styles.input}
        placeholder="Topic"
        value={topic}
        onChangeText={setTopic}
      />

      <TextInput
        style={styles.textarea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>📅 Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>⏰ Time: {time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Number of Participants"
        value={participants}
        onChangeText={setParticipants}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Target Group (e.g. 10th Students)"
        value={targetGroup}
        onChangeText={setTargetGroup}
      />

      <Button title="Submit Request" onPress={handleSubmit} color="#2e86de" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textarea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  dateText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
});

export default CreateRequestScreen;
