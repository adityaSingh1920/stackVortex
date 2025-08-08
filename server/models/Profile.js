const mongoose = require('mongoose')


const profileSchema = new mongoose.Schema(
    {
        dateOfBirth:
        {
            type:String
        },
        gender:
        {
            type:String,
            required:true,
        },
        contactNumber:
        {
            type:Number,
            trim:true
        },
        about:
        {
            type:String,
            trim:true
        }
    }
)

module.exports = mongoose.model("Profile",profileSchema)