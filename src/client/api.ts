import axios from 'axios';
import { tempIgData } from '../constants/mock';

const getDataFromServer = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data; // This will contain the server response
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

const getTestDataFromServer = async () => {
  try {
    const response = await axios.get('/api/test-data');
    return JSON.parse(response.data); // This will contain the server response
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

const getUserConfigTest = async () => {
  try {
    const response = await axios.get('/api/get-user-config');
    return response.data; // This will contain the server response
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

const retrieveLongLivedAccessToken = async (shortLivedAccessToken: string) => {
  try {
    const response = await axios.post(
      '/api/retrieve-long-token', 
      {
        shortLivedAccessToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    // TODO: Need to send this directly off to aws
    return response.data;
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
}

const getIgUser = async () => {
  try {
    const response = await axios.get(
      '/api/get-ig-user',
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching data from server', err);
    throw err;
  }
}

const getIgUserMedia = async () => {
  try {
    const response = await axios.get(
      '/api/get-ig-user-media',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    return response.data;
  } catch (err) {
    console.error('Error fetching data from server', err);
    throw err;
  }
}

const getIgUserMediaOffline = async () => {
  try {
    return tempIgData;

  } catch {
    console.error("WTF")
  }
}

export const API = {
  getDataFromServer,
  getTestDataFromServer,
  getUserConfigTest,
  retrieveLongLivedAccessToken,
  getIgUser,
  getIgUserMedia,
  getIgUserMediaOffline,
}