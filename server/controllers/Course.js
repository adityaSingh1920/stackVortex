const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const { imageUpload } = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    // fetch data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tags,
      category,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    // validation
    if (!courseDescription || !courseName || !whatYouWillLearn || !price) {
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    }

    const userId = req.user.id;
    const instructor = await User.findById(userId);

    if (!instructor) {
      return res.status(401).json({
        success: false,
        message: "instructor not found",
      });
    }

    const categoryDetails = await Category.findById(category);

    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: "category not valid",
      });
    }
    console.log("Files received: ", req.files);

    const thumbnailImage = await imageUpload(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      tags,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // add new course to user schema of instructor
    await User.findByIdAndUpdate(
      { _id: instructor._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    //  error

    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "course created succesfully",
      newCourse,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "course created succesfully",
      allCourse,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `coul not find course with ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "course details fetched ",
      courseDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
