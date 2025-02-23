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
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server);
let users = {};  // { socketId: username }

app.use(express.static('public'));

io.on('connection', (socket) => {

  // When a user sets their name
  socket.on('setName', (name) => {
    // Store the user's name with their socket ID
    socket.username = name;

    // Send the updated list of users to all clients
    io.emit('userList', Object.values(users));
  });

  // Listen for chat messages
  socket.on('chatMessage', (message) => {
    if (socket.username) {
      // Broadcast the message with the user's name
      io.emit('chatMessage', { user: socket.username, message });
    } else {
      // If user has no name set, handle this case
      io.emit('chatMessage', { user: 'Unknown User', message });
    }
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    delete socket.username; // Clear username when user disconnects
    io.emit('userList', Object.values(users)); // Update user list
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
app.use('/task',taskRoutes);
app.use('/events',eventRoutes);
app.use('/attendance',attendanceRoutes);
app.use('/feedback',feedbackRoutes);

// Start server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
