import dns from 'dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

import dotenv from 'dotenv';
dotenv.config();

import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors'; // Ensure cors is imported

import connectDB from './config/db.js';
import app from './app.js';
import { startBusSimulation } from './services/busSimulator.js';

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP Server
const httpServer = createServer(app);

// Configure Socket.io with enhanced CORS and Transport settings
const io = new Server(httpServer, {
  cors: {
    // Adding both localhost and the IP version just in case
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST"],
    credentials: true
  },
  // This helps prevent the 400 Bad Request by allowing 
  // the engine.io version used by modern React clients
  allowEIO3: true, 
  transports: ['websocket', 'polling'] 
});

io.on('connection', (socket) => {
  console.log(`📡 Commuter connected: ${socket.id}`);
  
  socket.on('error', (err) => {
    console.error(`❌ Socket error for ${socket.id}:`, err);
  });

  socket.on('disconnect', (reason) => {
    console.log(`🔌 Commuter disconnected: ${socket.id} | Reason: ${reason}`);
  });
});

// Start the simulation
startBusSimulation(io);

// Listen
httpServer.listen(PORT, () => {
  console.log(`\n🚀 [Server] Status: ONLINE`);
  console.log(`⚡ [Port]: ${PORT}`);
  console.log(`🌍 [Mode]: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 [CORS]: http://localhost:5173\n`);
});