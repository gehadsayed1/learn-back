require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const coursesRouter = require('./routes/Courses.route');
const usersRouter = require('./routes/Users.route');
const path = require('path');


// Debug: Check if environment variables are loaded
console.log('MONGO_URL:', process.env.MONGO_URL ? 'Found' : 'Not found');
console.log('PORT:', process.env.PORT || 'Using default 5000');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err.message));

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 handler for unmatched routes
app.all('*', (req, res) => {
  return res.status(404).json({ 
    message: `Can't find the route: ${req.originalUrl}` 
  });
});

// Global Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    status: error.statusText || 'error',
    message: error.message || 'Something went wrong!'
  });
});

// Start Server
app.listen(port, () => {
  console.log(`🌐 Server running on http://localhost:${port}`);
});