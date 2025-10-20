import express from 'express';
import dotenv from 'dotenv';

// Import your email routes
import emailRoutes from './routes/emailRoutes'; // Make sure the path is correct

dotenv.config();

const app = express();

app.use(express.json());

// Mount the email routes
app.use('/emails', emailRoutes);

// Health check endpoint for easy debugging
app.get('/', (_, res) => res.send('Backend running!'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
