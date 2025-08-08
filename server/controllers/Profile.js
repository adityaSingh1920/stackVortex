const Profile = require('../models/Profile')
const User = require('../models/User')
const { imageUpload } = require('../utils/imageUploader')
require("dotenv").config()


exports.updateProfile = async (req,res)=>
{
    try {
        const {dateofBirth,gender,about,contactNumber} = req.body;
        const userId = req.user.id;
         if(!dateofBirth)
         {
            return res.status(401).json({
                success:false,
                message:"required field"
            })
         }

         const userDetails = await User.findById(userId)

         const profileId = userDetails.additionalDetails

         const updateProfile = await Profile.findById(profileId)

         updateProfile.dateOfBirth = dateofBirth;
         updateProfile.about = about;
         updateProfile.contactNumber = contactNumber;
         updateProfile.gender = gender;

         await updateProfile.save();
         

         return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            updateProfile
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }
}


// profil pic update 
exports.profilePicUpdate = async(req,res)=>
{try {
    
    const image = req.files.image;

    const userId = req.user.id
    console.log(userId);
    
    

    if(!image ||!req.files)
    {
        return res.status(401).json(
            {
                success:false,
                message:"all field required"
            }
        )
    }

    const newimage = await imageUpload(image,process.env.FOLDER_NAME)

    const updatepic = await User.findByIdAndUpdate(userId, { image: newimage.secure_url }, { new: true });

return res.status(200).json(
    {
        success:true,
        message:"profile pic updated",
        updatepic
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



exports.deleteAccount = async(req,res) =>
{
   try {
    const userId = req.user.id ;
    // console.log(userId);
    

    const userDetails = await User.findById(userId)
    // console.log(userDetails);
    


    await Profile.findByIdAndDelete(userDetails.additionalDetails)
    await User.findByIdAndDelete(userId)

    
    return res.status(200).json({
        success:true,
        message:"deleted ",
    })

   } catch (error) {
    return res.status(401).json({
        success:false,
        message:error.message
    })
    
   }

    
    }


    exports.getAllUserDetails = async(req,res) =>
    {
       try {
        const userId = req.user.id ;

        const userDetails = await User.findById(userId).populate("additionalDetails").exec()
        
           
    return res.status(200).json({
        success:true,
        message:"data retrieved ",
        userDetails
    })

       } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message
        })
        
       }
    
    }


    exports.getEnrolledCourses = async(req,res) =>
    {
        try {
             const userId = req.user.id ;
             const userDetails = await User.findOne({
                _id:userId
             }).populate("courses")
             .exec()

             if(!userDetails)
             {
                return res.status(400).json(
                    {
                        success:false,
                        messgae:"failed"
                    }
                )
             }
             return res.status(200).json(
                {
                    success:true,
                    data:userDetails.courses
                }
             )
            
        } catch (error) {
             return res.status(400).json(
                    {
                        success:false,
                        messgae:"failed"
                    }
                )
        }
    }



