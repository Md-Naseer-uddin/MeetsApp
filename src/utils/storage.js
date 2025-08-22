import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const STORAGE_KEYS = {
  SME_ID: 'sme_id',
  SME_PROFILE: 'sme_profile',
  AUTH_TOKEN: 'auth_token',
};

// SME ID operations
export const storeSMEId = async (smeId) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SME_ID, smeId);
  } catch (error) {
    console.error('Error storing SME ID:', error);
    throw error;
  }
};

export const getSMEId = async () => {
  try {
    const smeId = await AsyncStorage.getItem(STORAGE_KEYS.SME_ID);
    return smeId;
  } catch (error) {
    console.error('Error getting SME ID:', error);
    return null;
  }
};

export const removeSMEId = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.SME_ID);
  } catch (error) {
    console.error('Error removing SME ID:', error);
    throw error;
  }
};

// SME Profile operations
export const storeSMEProfile = async (profile) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SME_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error('Error storing SME profile:', error);
    throw error;
  }
};

export const getSMEProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(STORAGE_KEYS.SME_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting SME profile:', error);
    return null;
  }
};

// Auth token operations
export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error storing auth token:', error);
    throw error;
  }
};

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Clear all stored data (logout)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.SME_ID,
      STORAGE_KEYS.SME_PROFILE,
      STORAGE_KEYS.AUTH_TOKEN,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
    throw error;
  }
};