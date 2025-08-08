const mongoose = require('mongoose')

const ratingAndReviewSchema  = new mongoose.Schema(
    {
        user:
                 [
                    {
                          type:mongoose.Schema.Types.ObjectId,
                        ref:'User',
                        required:true
        
                    }
                 ],
                 review:
                 {
                    type:String,
                    required:true,
                    trim:true
                 },
                 course:
                 {
                  type:mongoose.Schema.ObjectId,
                  ref:'course'
                 }


    }
)

module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema )