const User = require("../models/User");
const mailer = require("../utils/nodeamailer");






exports.sendMessaage = async(req,res) =>
{
    try {


        const {firstName,lastName,email,contactNumber,message} = req.body

        if(!email || !message || !firstName)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"all field are required"
                }
            )
        }

        await mailer(email,"Resposne mail","mail recorded")

        await mailer(
            "aditya915002@gmail.com",
            "New Response Received",
            `Name: ${firstName} ${lastName}\nEmail: ${email}\nContact Number: ${contactNumber}\nMessage: ${message}`
        );

        return res.status(200).json({
            success:true,
            message:"response send"
        })


        
    } catch (error) {

         return res.status(500).json(
                {
                    success:false,
                    message:error.message
                }
            )
    }
}

