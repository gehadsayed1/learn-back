require('dotenv').config(); 

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')
const coursesRouter = require('./routes/Courses.route');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log("✅ Connected successfully to MongoDB");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use('/api/courses', coursesRouter);


// app.all('*', (req, res) => {
//   return res.status(404).json({ message: `Can't find the route: ${req.originalUrl}` });
// });
 app.use(( error , req , res , next)=>{
res.status(500).json({status : error.message})
 })

app.listen(port, () => console.log(`🌐 Server running on http://localhost:${port}`));
