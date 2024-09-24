import axios from 'axios';

export const generateResponse = async (prompt) => {
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',  // Use GPT-4 model
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 100,
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // Ensure your API key is used
    },
  });

  return res.data;
};