require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
const eventRoutes = require('./routes/eventRoutes.js');
const attendanceRoutes = require('./routes/attendanceRoutes.js');
const feedbackRoutes = require('./routes/feedbackRoutes.js');
const communicationRoutes = require('./routes/communicationRoutes.js');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] }
});

let users = {};  // { socketId: username }

app.use(express.static('public'));



// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
      io.emit("chatMessage", data); // Broadcast message
  });

  socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/staff', staffRoutes);
app.use('/api', apiRoutes);
app.use('/task', taskRoutes);
app.use('/events', eventRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/communication', communicationRoutes);

// Start server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
