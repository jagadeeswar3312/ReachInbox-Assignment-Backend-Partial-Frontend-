import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';
import pLimit from 'p-limit';
dotenv.config();

export interface Email {
  subject?: string;
  from?: string;
  text?: string;
  html?: string;
}

export const fetchUnreadEmails = async (): Promise<Email[]> => {
  const host = process.env.IMAP_HOST;
  const port = process.env.IMAP_PORT ? Number(process.env.IMAP_PORT) : 993;
  const user = process.env.IMAP_USER;
  const pass = process.env.IMAP_PASSWORD;
  if (!host || !user || !pass) {
    throw new Error('Missing IMAP configuration. Please set IMAP_HOST, IMAP_USER, and IMAP_PASSWORD in your .env file');
  }

  const client = new ImapFlow({
    host,
    port,
    secure: true,
    auth: { user, pass },
    socketTimeout: 60000,
  });

  const maxRetries = 3;
  let attempt = 0;
  let emails: Email[] = [];
  while (attempt < maxRetries) {
    try {
      attempt++;
      await client.connect();
      const lock = await client.getMailboxLock('INBOX');
      const unreadEmails: Email[] = [];
      const batchSize = 5;
      const concurrencyLimit = 2;
      const MAX_EMAIL_BODY_SIZE = 5000;
      const limit = pLimit(concurrencyLimit);
      const totalEmails = await client.search({ seen: false });
      if (!totalEmails || totalEmails.length === 0) {
        lock.release();
        await client.logout();
        return [];
      }
      const emailsToProcess = totalEmails.slice(0, 50);
      const batchPromises: Promise<void>[] = [];
      for (let i = 0; i < emailsToProcess.length; i += batchSize) {
        const batch = emailsToProcess.slice(i, i + batchSize);
        batchPromises.push(
          limit(async () => {
            for await (const msg of client.fetch(batch, { source: true, envelope: true })) {
              const parsed = await simpleParser(msg.source!);
              unreadEmails.push({
                subject: parsed.subject,
                from: parsed.from?.text,
                text: parsed.text?.slice(0, MAX_EMAIL_BODY_SIZE),
                html: parsed.html?.slice(0, MAX_EMAIL_BODY_SIZE),
              });
            }
          })
        );
      }
      await Promise.all(batchPromises);
      lock.release();
      await client.logout();
      emails = unreadEmails;
      break; // success
    } catch (error: any) {
      if (error.code === 'ETIMEOUT' && attempt < maxRetries) {
        await new Promise(res => setTimeout(res, 2000));
      } else {
        throw error;
      }
    }
  }
  return emails;
};
