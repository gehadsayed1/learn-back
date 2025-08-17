const express = require("express");
const { validationSchema } = require("../middleware/ValidationSchema.js");

const {
  updateCourse,
  deleteCourse,
  getCourse,
  getCourses,
  createCourse,
} = require("../controller/Courses.controller.js");
const verifyToken = require("../middleware/verifyToken.js");
const userRoles = require("../utils/userRoles.js");
const allowedTo = require("../middleware/AllowedTo.js");

const router = express.Router();


router.route("/").get(getCourses).post(validationSchema(), createCourse);
router.route("/:id").get(getCourse).patch(updateCourse).delete(verifyToken, allowedTo(userRoles.ADMIN),deleteCourse);

module.exports = router;
