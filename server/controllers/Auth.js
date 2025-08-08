const User = require("../models/User");
const otpGenerator = require("otp-generator");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodeamailer");
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otpExist = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (otpExist) {
      const now = new Date();
      const timediff = (now - otpExist.createdAt) / 1000;

      if (timediff < 60) {
        return res.status(500).json({
          message: "please try after 1 min",
        });
      }
    }

    // check userexist
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }
    var otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const result = await Otp.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp });
    }
   
    
    const mailResponse = await mailer(email, "verification  mail", otp);
    
    if (mailResponse == "error") {
      return res.status(500).json({
        message: "Error sending otp",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });

    await Otp.deleteMany({ email });
    const otpbody = await Otp.create({ email, otp });
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      sucesss: false,
      message: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const findOtp = await Otp.find({ email }).sort({ createdAt: -1 });

  if (findOtp.length === 0) {
    return res.status(401).json({ success: false, message: "OTP not found" });
  } else if (otp !== findOtp[0].otp) {
    return res.status(401).json({ success: false, message: "OTP invalid" });
  }

  return res.status(200).json({ success: true, message: "OTP verified" });
};

// signup function

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "password does not match",
      });
    }

    const checkUserExist = await User.findOne({ email });

    if (checkUserExist) {
      return res.status(401).json({
        success: false,
        message: "user already exists",
      });
    }


   
    const hashPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: "Not specified",
      dateOfBirth: null,
      about: "",
      contactNumber: contactNumber,
    });
    console.log(accountType);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      accountType,
      contactNumber,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        firstName + " " + lastName
      )}`,
    });

    return res.status(200).json({
      success: true,
      user,
      message: "user created successfully",
    });
    1;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "user cannot be registered",
      error: error.message,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "please enter all field",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails")
      .exec();;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registerd please signup",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        // httpOnly:true
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "logged in",
      });
    } else {
      return res.status(401).json({
        succes: false,
        message: "paswword incorrect",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// change password
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;

  const userDetails = await User.findById(req.user._id);

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(401).json({
      succes: false,
      message: "please enter all the fields",
    });
  }
  if (newPassword != confirmNewPassword) {
    return res.status(401).json({
      succes: false,
      message: "password did not  match",
    });
  }

  const compare = await bcrypt.compare(oldPassword, userDetails.password);
  if (!compare) {
    return res.status(401).json({
      success: false,
      message: "please enter old password correctly",
    });
  }

  const hashpass = await bcrypt.hash(newPassword, 10);
  const updatepass = await User.findByIdAndUpdate(
    userDetails._id,
    { password: hashpass },
    { new: true }
  );

  try {
    await mailer(
      userDetails.email,
      "Password Update",
      "Password updated successfully"
    );
  } catch (emailError) {
    console.error("Error sending email:", emailError.message);
  }
  res.status(200).json({
    success: true,
    message: "password updated",
    updatepass,
  });
};
