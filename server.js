import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import courseRoutes from './routes/courseRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// ✅ CORS - update with your frontend port
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
}));

// ✅ Body parser for JSON
app.use(express.json());

// Connect DB
connectDB();

// ✅ Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => res.send('LMS backend running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
