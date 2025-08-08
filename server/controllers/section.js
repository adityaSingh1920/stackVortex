const Courses = require('../models/Course');
const Section  = require('../models/sectionSchema')


exports.createSection = async(req,res) =>
{
    try {
        
    const {sectionName,courseId} = req.body;
    if(!sectionName || !courseId)
    {
        return res.status(401).json(
            {
                success:false,
                message:"all fields are required"
            }
        )
    }
    const section = await Section.create({sectionName})

    const updateCourse = await Courses.findByIdAndUpdate(courseId,
        {
            $push:{
            courseContent:section._id
        }},
        {
            new:true
        }
    ).populate('courseContent').exec();

    return res.status(200).json(
        {
            success:true,
            message:'section created succesfully',
            updateCourse
        }
    )
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
        
    }

    

    
}


exports.updateSection = async(req,res) =>
{
    try {
        const {title,sectionId} = req.body;

    if(!title || !sectionId) 
    
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"all fields are required"
                }
            )

        }


        const updatesection = await Section.findByIdAndUpdate(
            sectionId,
            {$set:{
                title:title
            }},
            {
                new:true
            }
        )   

        return res.status(200).json(
            {
                success:true,
                message:'section updated succesfully',
                updatesection
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


exports.deleteSection = async(req,res) =>
    {
        try {
            const {sectionId} = req.body;
    
    
    
            const deleteSection = await Section.findByIdAndDelete(
                sectionId
            )
    
            return res.status(200).json(
                {
                    success:true,
                    message:'section deleted succesfully',
                    deleteSection
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