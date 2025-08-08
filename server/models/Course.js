const mongoose = require('mongoose')
const category = require('./Category')

const courseSchema = new mongoose.Schema(
    {
        courseName:
        {
            type:String,
            trim:true,
            required:true
        },
        courseDescription:
        {
            type:String,
            trim:true,
            required:true
        },
        instructor:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        whatYouWillLearn:
        {
            type:String
        },
        courseContent:
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'SectionSchema'
            }
        ],
        ratingAndReviews:
        [
            {
                 type:mongoose.Schema.Types.ObjectId,
                ref:'RatingAndReviews'

            }
        ],
        price:
        {
            type:Number

        },
        thumbnail:
        {
            type:String
        },
        category:
        {
             type:mongoose.Schema.Types.ObjectId,
             ref:'Category'

        },
        tags:
        [{
            type:String
        }],
        studentsEnrolled:
         [
            {
                  type:mongoose.Schema.Types.ObjectId,
                ref:'Users',
                require:true

            }
         ]
    }
       
)

// createdAt,status,isntructions needs to added

module.exports = mongoose.model("Course",courseSchema)