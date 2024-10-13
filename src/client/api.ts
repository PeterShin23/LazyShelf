import axios from 'axios';

const getDataFromServer = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data; // This will contain the server response
  } catch (error) {
    console.error('Error fetching data from server:', error);
    throw error;
  }
};

export const API = {
  getDataFromServer,
}