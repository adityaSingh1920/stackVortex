const nodemailer = require("nodemailer");
require('dotenv').config()


const mailer = async (email,title,body)=>
{
    try {
        
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
       user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  })
  



  const mailOptions = {
    from:'Aditya singh',
    to:`${email}`,
    subject: `${title}`, // Subject line
    html: `${body}`, // HTML body
  }

  const info = await transporter.sendMail(mailOptions)
  console.log(info.response);
  return info
  
        
    } catch (error) {
      console.log(error);
      
      return "error";
        // return res.status(401).json(
        //   {
        //     message:"error sending mail"
        //   }
        // )
        
    }
}

module.exports = mailer;

