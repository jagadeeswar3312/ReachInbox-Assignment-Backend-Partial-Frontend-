import axios from 'axios';

export const sendToWebhook = async (webhookUrl: string, data: any) => {
  try {
    await axios.post(webhookUrl, data);
  } catch (error) {
    console.error('Webhook send error:', error);
    throw error;
  }
};
