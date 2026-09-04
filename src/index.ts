import express from 'express';
import { config } from 'dotenv';
import { connectDB, disconnectDB } from '@/config/db.js';

// Import Routes Section
import authRoutes from '@/routes/authRoutes.js';
import nightlyRoutes from '@/routes/nightlyRoutes.js';
import heroesRoutes from '@/routes/heroesRoutes.js';

// Load environment variables
config();
connectDB();

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 7000;

// Core Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the MLBB API (Stable)'
  });
});

app.use('/auth', authRoutes);

app.use('/nightly', nightlyRoutes);

// Custom API Routes
app.use('/heroes', heroesRoutes);

// Start of the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`URL : http://localhost:${PORT}`);
});

// Handle shutdown events
process.on('SIGINT', async () => {
  console.log('SIGINT, Shutting down the server...');
  await disconnectDB();
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM, Shutting down the server...');
  await disconnectDB();
  process.exit(1);
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err);
  await disconnectDB();
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  await disconnectDB();
  process.exit(1);
});