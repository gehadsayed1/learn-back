const express = require("express");
const coursesRouter = require('./routes/Courses.route')


const app = express();
const port = 5000;

app.use(express.json());

app.use('/api/courses' ,coursesRouter);


app.listen(port, () => console.log(`http://localhost:${port}`));
