const { default: mongoose } = require('mongoose');
const Courses = require('../models/Course')
const ratingAndReviews = require('../models/RatingAndReview')



exports.createRating = async(req,res)=>
{
    try {

        const userId = req.user.id
        const {rating,review,courseId} = req.body;
         
        const courseDetails = await Courses.findOne({_id:courseId,
            StudentsEnrolled:{
                $elemMatch:{$eq:userId}}})

                if(!courseDetails)
                {
                    return res.json(400).json(
                        {
                            success:false,
                            message:"course details not available"
                        }
                    )
                }

                const alreadyReviewed = await ratingAndReviews.findOne({
                    course:courseId,
                    user:userId
                })

                if(alreadyReviewed)
                {
                    return res.status(400).json(
                        {
                            success:false,
                            message:"already reviewed"
                        }
                    )
                }

                const ratingReview = await ratingAndReviews.create({
                    rating,
                    review,
                    course:courseId,
                    user:userId
                })

                const updateCourse = await Courses.findByIdAndUpdate({_id:courseId},
                    {
                        $push:
                        {
                            ratingAndReviews:ratingReview._id
                        }
                    },
                    {
                        new:true
                    }
                )

                return res.status(200).json(
                    {
                        success:true,
                        message:"rating and review succesfull"
                    }
                )

        
    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                error:error.message
            }
        )
        
    }
}




exports.getAverageRating = async (req,res)=>
{
    try {
        const {courseId} = req.body;

    const result = await ratingAndReviews.aggregate([
        {
            $match:
            {
                course: mongoose.Types.ObjectId(courseId)
            }
        },
        
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }
        }
    ])

    if(result.length >0)
    {
        return res.status(200).json(
            {
                success:true,
                averageRating:result[0].averageRating
            }
        )
    }

    return res.status(200).json(
        {
            success:true,
            message:"average rating 0",
            averageRating:0
        }
    )
        
    } catch (error) {

        return res.status(401).json(
            {
                success:false,
                message:error.message
            }
        )
        
    }
}




exports.getAllRating = async(req,res) =>
{
    try {

        const allrating = await ratingAndReviews.find({}).sort({
            rating:"desc"
        }).populate(
            {
                path:"user",
                select:"firstName lastName email image"
            }
        ).populate(
            {
                path:"course",
                select:"courseName"
            }
        )
        

        return res.status(200).json(
            {
                success:true,
                message:"all raitng fetched succesfully",
                allrating
            }
        )
    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                message:error.message
            }
        )
        
    }
}