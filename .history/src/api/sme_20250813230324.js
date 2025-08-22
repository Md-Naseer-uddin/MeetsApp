import axios from 'axios';
import { BASE_URL } from '@env';

// Register SME for an event
export const registerForEvent = async (eventId, smeId) => {
  try {
    const response = await axios.post(`${BASE_URL}/sme/register/${eventId}`, {
      _id: smeId,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

// Get SME profile (if needed)
export const getSMEProfile = async (smeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sme/profile/${smeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching SME profile:', error);
    throw error;
  }
};

// Get events relevant to SME (if there's a specific endpoint)
export const getRelevantEvents = async (smeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sme/events/${smeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching relevant events:', error);
    throw error;
  }
};

// Get SME's applied events
export const getAppliedEvents = async (smeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sme/applied-events/${smeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applied events:', error);
    throw error;
  }
};