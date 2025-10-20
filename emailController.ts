import { Request, Response } from 'express';
import { fetchUnreadEmails } from '../services/imapService';
import { analyzeEmail } from '../services/aiService';
import { sendToWebhook } from '../services/webhookService';
import pLimit from 'p-limit';

export const fetchEmails = async (req: Request, res: Response) => {
  try {
    const emails = await fetchUnreadEmails();
    res.json({ count: emails.length, emails });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch emails' });
  }
};

export const analyzeAndSend = async (req: Request, res: Response) => {
  const { webhookUrl } = req.body;
  if (!webhookUrl) {
    return res.status(400).json({ message: 'Webhook URL is required' });
  }
  try {
    const emails = await fetchUnreadEmails();
    const concurrencyLimit = 5;
    const limit = pLimit(concurrencyLimit);
    const analyzedEmails = await Promise.all(
      emails.map(email =>
        limit(async () => ({
          ...email,
          summary: await analyzeEmail(email.text || ''),
        }))
      )
    );
    await sendToWebhook(webhookUrl, analyzedEmails);
    res.json({ message: 'Emails analyzed and sent successfully', count: analyzedEmails.length });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to analyze and send emails' });
  }
};
