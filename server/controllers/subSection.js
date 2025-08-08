const subSection = require('../models/subSection')
const Section = require('../models/sectionSchema');
const { imageUpload } = require('../utils/imageUploader');
require('dotenv').config()



exports.createSubSection = async(req,res) =>
{
   try {
    const {title,timeDuration,description,sectionID} = req.body;
    const video = req.files.videoFile

    if(!title || !timeDuration || !description || !sectionID || !video) 
    {
        return res.status(401).json(
            {
                success:false,
                message:"all fields are required"
            }
        )
    }

    const uploadvideo = await imageUpload(video,process.env.FOLDER_NAME)  
    const subsection = await subSection.create({
        title,timeDuration,description,sectionID,
        videoUrl:uploadvideo.secure_url
    })

    const updateSection = await Section.findByIdAndUpdate(sectionID,
     {
        $push:
        {
            subSection:subsection._id
        },
     },
     {
        new:true
     }
    )


    return res.status(200).json(
        {
            success:true,
            updateSection,
            subsection,
            message:"subSection added succesfully"
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


// update 
// error 
exports.updateSubSection = async (req,res) =>
{
   try {
    const {title,timeduration,description,sectionID,} = req.body;
    const video = req.files.videoFile

    if(!title || !timeduration || !description || !sectionID || !video) 
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"all fields are required"
                }
            )
        }
         const uploadvideo = await imageUpload(video,process.env.FOLDER_NAME) 

        const section = await Section.findById(sectionID)

        const subsection = section.subSection
        

        const updatesubSection = await subSection.findByIdAndUpdate({_id:subsection._id},
            {
                $push:
                {
                    title,timeduration,description,
                    videoUrl:uploadvideo.secure_url
                },
                
                
            },
            {
                new:true
            }
        ).populate("title","timeduration","description","videoUrl").exec()

        return res.status(200).json({
            success:false,
            message:"Subs section updated successfully",
            updatesubSection
        })
    
   } catch (error) {

    return res.status(401).json(
        {
            success:false,
            message:error.message
        }
    )
    
   }



}
// delete 


exports.deleteSubSection = async(req,res)=>
{
    try {

        const {subsectionId,sectionId} = req.body;

        if(!subsectionId || !sectionId) 
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"both fields are reuired"
                }
            )
        }

    await subSection.findByIdAndDelete(subsectionId)

    const updateSection = await Section.findByIdAndUpdate(sectionId,
        {
            $pull:
            {
                subSection:subsectionId
            }
        },
        {
            new:true
        }
    )
    return res.status(200).json({
        success:true,
        message:"Subs section updated successfully",
        updateSection
    })
    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                message:error.message
            }
        )
        
    }
}