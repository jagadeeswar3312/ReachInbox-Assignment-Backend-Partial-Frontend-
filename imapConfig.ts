import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

export const fetchUnreadEmails = async () => {
  const host = process.env.IMAP_HOST!;
  const port = process.env.IMAP_PORT ? Number(process.env.IMAP_PORT) : 993;
  const user = process.env.IMAP_USER!;
  const pass = process.env.IMAP_PASSWORD!;

  const client = new ImapFlow({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });

  await client.connect();
  const lock = await client.getMailboxLock('INBOX');
  const unreadEmails: any[] = [];

  try {
    const messages = await client.search({ seen: false });

    if (!messages || messages.length === 0) {
      lock.release();
      await client.logout();
      return [];
    }

    for await (const msg of client.fetch(messages, { source: true, envelope: true })) {
      const parsed = await simpleParser(msg.source!);
      unreadEmails.push({
        subject: parsed.subject,
        from: parsed.from?.text,
        text: parsed.text,
        html: parsed.html,
      });
    }
  } finally {
    lock.release();
    await client.logout();
  }

  return unreadEmails;
};
