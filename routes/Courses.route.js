const express = require("express");
const { validationSchema } = require("../middleware/ValidationSchema.js");

const {
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
  createCourse,
} = require("../controller/Courses.controller.js");

const router = express.Router();


router.route("/").get(getCourses).post(validationSchema(), createCourse);
router.route("/:id").get(getCourse).patch(updateCourse).delete(deleteCourse);

module.exports = router;
