const { validationResult } = require("express-validator");
const Course = require("../Models/Course.Model");

const getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: "courses not found" });
    }
    return res.json(course);
  } catch {
    return res.status(400).json({ msg: "infalid id" });
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );

    return res.status(200).json(course);
  } catch (e) {
    return res.status(400).json({ erroe: e });
  }
};

const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);

  const course = await newCourse.save();
  res.status(201).json(course);
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.deleteOne({ _id: id });

    return res.status(200).json({ msg: "Deleted successfully" });
  } catch (e) {
    return res.status(404).json({ erroe: "course not found" });
  }
};

module.exports = {
  getCourses,
  getCourse,
  updateCourse,
  createCourse,
  deleteCourse,
};
