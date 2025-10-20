import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

let openaiClient: OpenAI | null = null;
function getOpenAI(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file');
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

export const analyzeEmail = async (content: string): Promise<string> => {
  const prompt = `Please summarize this email:\n\n${content}`;
  const response = await getOpenAI().chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0]?.message?.content || 'No summary generated.';
};
