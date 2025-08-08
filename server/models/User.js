const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstName :
        {
            required:true,
            type:String,
            trim:true

        },
        lastName:
        {
            required:true,
            type:String,
            trim:true
        },
        email:
        {
            required:true,
            type:String,
            trim:true
        },
        password:
        {
            required:true,
            type:String
        },
        accountType:
        {
            type:String,
            enum:["Student","Instructor","Admin"]
        },
        additionalDetails:
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Profile"
        },
        image:
        {
            type:String,
            required:true
        },
        courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Course"
        }],
        token:
        {
            type:String,
           
        },
        resetPasswordExpires:
        {
            type:Date
        },
        courseProgress:
       [{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"CourseProgress"
        }]
       
    },
    {
        timestamps:true
    }
)

// to add active and approved

module.exports = mongoose.model("User",userSchema)