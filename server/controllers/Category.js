const Category = require('../models/Category')


exports.createCategory = async(req,res)=>
{
    try {
        const {name,description} = req.body;

        if(!name || !description)
        {
            return res.status(401).json(
                {
                    success:false,
                    message:"please enter both the field"
                }
            )
        }
        // const course = await course

        const category = await Category.create({
            name,description,
        })
        res.status(200).json(
            {
                success:true,
                category,
                message:"category created succesfully"
            }
        )
        
    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                message:"failed to create tag"
            }
        )
        
    }
}






exports.getCategory = async(req,res)=>
{
    try {

        const allCategory = await Category.find({},{name:true,description:true})

        res.status(200).json(
            {
                success:true,
                allCategory,
                message:"all tag returned succesfully"
            }
        )
        
    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                message:"failed to show tag"
            }
        )
        
    }
        
    }


    exports.categoryPage = async(req,res)=>
    {
       try
       {
        const {categoryId} = req.body;
        console.log(categoryId);
        
        const selectedCategory = await Category.findById(categoryId).populate("course").exec()

        if(!selectedCategory) 
        {
            return res.status(400).json(
                {
                    success:true,
                    message:"data not found"
                }
            )  
        }

        const differentCourseCategory  = await Category.find(
            {
                _id:{$ne:categoryId}
            }
        ).populate("course").exec(); 
        return res.status(200).json(
            {
                succes:true,
                differentCourseCategory,
                selectedCategory,
                message:"Suucessfull"
            }
        )
       } catch (err)
       {
        res.status(401).json(
            {
                success:false,
                message:err.message
            }
        )
       }
    }


    