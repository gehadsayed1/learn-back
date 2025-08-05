const express = require("express");
const coursesRouter = require('./routes/Courses.route')


const mongoose = require('mongoose');
const url =
  "mongodb+srv://jihadsayed:191998jihad@cluster0.qmhhgvx.mongodb.net/rmake?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(url).then(() =>{
 console.log("Connected successfully to server");
})

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/courses' ,coursesRouter);


app.listen(port, () => console.log(`http://localhost:${port}`));
