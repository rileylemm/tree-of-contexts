import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const generateResponse = async (prompt) => {
  const res = await axios.post('https://api.openai.com/v1/completions', {
    model: 'gpt-4',  // Using GPT-4
    prompt: prompt,
    max_tokens: 100,
  }, {
    headers: {
      Authorization: `Bearer ${apiKey}`,  // Use the API key from the .env file
    },
  });

  return res.data;
};