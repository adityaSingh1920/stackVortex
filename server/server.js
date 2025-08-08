require("dotenv").config();
const dbConnect = require('./config/Databse')
const cloudinaryConnect = require('./config/Cloudinary')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const cors = require('cors')
const express = require('express')
const app = express()

const userRoutes = require('./routes/userRoutes')

const profileRoutes = require('./routes/profileRoutes')

const courseRoutes = require('./routes/coursesRoutes')

const paymentRoutes = require('./routes/paymentRoutes')

const PORT = process.env.PORT || 4000



dbConnect(); 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors(
        {
            origin:"http://localhost:5173",
            credentials:true
        }
    ))


    app.use(
        fileupload(
            {
                useTempFiles:true,
                tempFileDir:"/tmp"
            }
        )
    )

    cloudinaryConnect();

    app.use("/api/v1/auth",userRoutes)
    app.use("/api/v1/profile",profileRoutes)
    app.use("/api/v1/course",courseRoutes)
    app.use("/api/v1/payment",paymentRoutes)
 
    app.get("/",(req,res)=>
    {
        return res.statusCode.json(
            {
                success:true,
                message:"this is default route"
            }
        )
    }
    )


app.listen(PORT,()=>
{
    console.log(`Server started at port ${PORT}`)
})