const express = require("express");
const {validtionSckema} = require('../middleware/ValidationSchema.js')

const {
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
  createCourse,
} = require("../controller/Courses.controller.js");

const router = express.Router();



// get all courses
router
  .route('/')
  .get(getCourses)
  .post(validtionSckema(), createCourse);

// get single course
router
  .route('/:id')
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

module.exports = router;
