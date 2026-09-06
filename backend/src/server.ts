import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketServer } from 'socket.io';

// Initialize environment configuration
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Configure API middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create the HTTP server used by both Express and Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO for real-time client communication
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Health check endpoint for monitoring and service availability
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Chrono Master Pro Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Handle Socket.IO client connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Centralized error handler for unhandled application errors
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
  });
});

// Handle requests to undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Start the application server
server.listen(PORT, () => {
  console.log(`🚀 Chrono Master Pro Backend running on port ${PORT}`);
  console.log(`📡 Socket.io ready for real-time updates`);
});

// Export server instances for testing and external integrations
export { app, io, server };
