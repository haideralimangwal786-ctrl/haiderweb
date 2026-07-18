import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import http from 'http';
import { Server } from 'socket.io';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

// Load env variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Compress all API responses (huge performance boost for base64 strings)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  // Production Vercel URL
  'https://haiderweb-7vmc3ywri-haideralimangwal786-ctrls-projects.vercel.app',
  // Dynamic env variable (set in Render dashboard)
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any vercel.app preview deployment for this project
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Bind io to app so routes can access it
app.set('io', io);

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Increase payload limit for large base64 image strings (up to 20MB)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running successfully' });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
