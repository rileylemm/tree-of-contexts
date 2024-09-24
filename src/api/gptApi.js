import axios from 'axios';

export const generateResponse = async (prompt) => {
  const res = await axios.post('http://localhost:5001/generate', { prompt });
  return res.data;
};

