import express from 'express';
import { fetchEmails, analyzeAndSend } from '../controllers/emailController';
const router = express.Router();

router.get('/fetch', fetchEmails);
router.post('/analyze', analyzeAndSend);

export default router;
