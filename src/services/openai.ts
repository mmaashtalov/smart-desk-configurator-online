import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.error('VITE_OPENAI_API_KEY is not set in the environment variables.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function getChatCompletion(messages: any[]) {
  if (!apiKey) {
    return 'The OpenAI API key is not configured. Please add it to your .env file.';
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error getting chat completion:', error);
    return 'Sorry, there was an error communicating with the AI. Please try again later.';
  }
} 