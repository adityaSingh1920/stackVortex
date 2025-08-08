const mongoose = require("mongoose");
const mailer = require("../utils/nodeamailer");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 19 * 60,
  },
},

{
  timestamps:true
});



module.exports = mongoose.model("Otp", otpSchema);
