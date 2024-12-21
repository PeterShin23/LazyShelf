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

const createUser = async (shortLivedAccessToken: string) => {
  try {
    const response = await axios.post(
      '/api/create-internal-user', 
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

const getIgUser = async (userConfig: any) => {
  try {
    const response = await axios.post(
      '/api/get-ig-user',
      {
        userConfig,
      },
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

const getIgUserMedia = async (userConfig: any) => {
  try {
    const response = await axios.post(
      '/api/get-ig-user-media',
      {
        userConfig,
      },
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

const logToServer = async (data: string) => {
  await axios.post(
    '/api/log-to-server',
    {
      data,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  ) 
}

export const API = {
  createUser,
  getDataFromServer,
  getTestDataFromServer,
  getUserConfigTest,
  retrieveLongLivedAccessToken,
  getIgUser,
  getIgUserMedia,
  logToServer,
}