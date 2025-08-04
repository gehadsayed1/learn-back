const { validationResult } = require("express-validator");
let { courses } = require("../data/Courses.js");

const getCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  let id = +req.params.id;
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ msg: "courses not found" });
  }
  res.json(course);
};

const updateCourse = (req, res) => {
  let id = +req.params.id;
  let course = courses.find((course) => course.id === id);
  if (!course) {
    return res.status(404).json({ msg: "courses not found" });
  }
  course = { ...course, ...req.body };
  res.status(200).json(course);
};
const createCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  }

  const data = req.body;

  const course = { id: courses.length + 1, ...data };
  courses.push(course);
  res.status(201).json(course);
};

const deleteCourse = (req, res) => {
  let id = +req.params.id;
  courses = courses.filter((course) => course.id !== id);

  res.status(200).json({ success: "Deleted successfully" });
};

module.exports = {
  getCourses,
  getCourse,
  updateCourse,
  createCourse,
  deleteCourse,
};
