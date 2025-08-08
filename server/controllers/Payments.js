const { default: mongoose } = require("mongoose");
const mailer = require("../utils/nodeamailer");
const { instance } = require("../config/razorpay");
const Courses = require("../models/Course");
const User = require("../models/User");

exports.capturePayment = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId || !userId) {
      return res.status(401).json({
        success: false,
        message: "all fileds are required",
      });
    }

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "cannot find course",
      });
    }

    const uid = mongoose.Types.ObjectId(userId);

    if (course.StudentsEnrolled.includes(uid)) {
      return res.status(200).json({
        success: false,
        message: "students already enrolled",
      });
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        course: course._id,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescprition,
        courseImage: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "cannot initiate payment",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345";
  const signature = req.headers["x-razorpay_signature"];

  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature == digest) {
    console.log("payment authorised");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Courses.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            StudentsEnrolled: userId,
          },
        },
        {
          new: true,
        }
      );
      if (!enrolledCourse) {
        return res.status(401).json({
          success: false,
          message: "failed",
        });
      }

      const updateStudent = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            courses: courseId,
          },
        },
        {
          new: true,
        }
      );
      console.log(updateStudent);

      const emailresponse = await mailer(
        updateStudent.email,
        "congratulations",
        "Your enrollment is successful"
      );

      return res.status(200).json({
        success: true,
        message: "success",
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "invalid request",
    });
  }
};
