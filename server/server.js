require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const staffRoutes = require('./routes/staffRoutes.js');

// Middleware
app.use(cors(
    {
        origin: process.env.CLIENT_URL
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/students',studentRoutes);
app.use('/staff',staffRoutes);
// Start server
app.listen(process.env.PORT , function() {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
