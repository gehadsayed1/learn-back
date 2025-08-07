const { validationResult } = require("express-validator");
const Course = require("../Models/Course.Model");
const {SUCCESS , ERROR , FALL} = require('../utils/httpStatusText');
const asyncWrapper = require("../middleware/asyncWrapper");

const getCourses = asyncWrapper(
   async (req, res) => {
  const limit = req.query.limit || 2
  const page = req.query.page || 1
  const skip = (page - 1) * limit
  const courses = await Course.find({} , {'__v' : false}).limit(limit).skip(skip);
  res.json({ message: SUCCESS , data :{courses}});
}
)

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message:FALL , data :{course : 'course not found'}});
    }
    return res.json({ message:SUCCESS , data :{course}});
  } catch (error) {
    return res.status(400).json({ message:ERROR , data :null , message :error.message});
  }
};

const updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.updateOne(
      { _id: id },
      { $set: { ...req.body } }
    );

    return res.status(200).json({ message:SUCCESS , data :{course}});
  } catch (e) {
    return res.status(400).json({ message: ERROR , data :{message : e.message}});
  }
};




const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message:FALL , data :errors.array()});
  }

  const newCourse = new Course(req.body);

  const course = await newCourse.save();
  res.status(201).json({ message:SUCCESS , data :{course}});
};

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.deleteOne({ _id: id });

    return res.status(200).json({ message: SUCCESS , data:null });
  } catch (e) {
    return res.status(404).json({ message: e.message });
  }
};

module.exports = {
  getCourses,
  getCourse,
  updateCourse,
  createCourse,
  deleteCourse,
};
