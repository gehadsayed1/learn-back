const { validationResult } = require("express-validator");
const Course = require("../Models/Course.Model");
const {SUCCESS , ERROR , FALL} = require('../utils/httpStatusText');
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/Apperror");

const getCourses = asyncWrapper(
   async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({} , {'__v' : false}).limit(limit).skip(skip);
  res.json({ message: SUCCESS , data :{courses}});
})

const getCourse = asyncWrapper(async (req, res , next) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
    const error = appError.create('Course not found', 404, ERROR);
      return next(error);
  }
    return res.json({ message:SUCCESS , data :{course}});
});

const updateCourse = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const course = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );
    
    return res.status(200).json({ message:SUCCESS , data :{course}});
});

const createCourse = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message:FALL , data :errors.array()});
  }
   
  const newCourse = new Course(req.body);
  const course = await newCourse.save();
  res.status(201).json({ message:SUCCESS , data :{course}});
});

const deleteCourse = asyncWrapper(async (req, res) => {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    await Course.deleteOne({ _id: id });

    return res.status(200).json({ message:'Course deleted successfully' });
});

module.exports = {
  getCourses,
  getCourse,
  updateCourse,
  createCourse,
  deleteCourse,
};