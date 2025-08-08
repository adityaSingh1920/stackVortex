const mailer = require('../utils/nodeamailer');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto');



exports.resetPasswordToken = async(req,res)=>
{
    try
    {
        const email = req.body.email;

    const user = await User.findOne({email})

    if(!user)
    {
        return res.status(401).json(
            {
                success:false,
                message:"no such user exist"
            }
        )
    }

    const token = crypto.randomUUID()
    const updateuser = await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000
    },{new:true})
    const url = `http://localhost:5173/reset-password/${token}`

   await mailer(email,"reset password link",`link ${url}`)

   res.status(200).json(
    {
        success:true,
        message:"reset password link sent  succesfully",
        updateuser
    }
   )
    }

    catch(error)
    {
        res.status(401).json(
            {
                success:false,
                message:"failed to update passowrd"
            }
        )
    }

}


exports.resetPassword = async(req,res)=>
{
try
{
    const {password,confirmPassword,token} = req.body;

const user = await User.findOne({token})

if(!user)
{
    res.status(401).json(
        {
            success:false,
            message:"invalid token"
        }
    )

}
if(password !== confirmPassword)
{
    res.status(401).json(
        {
            success:false,
            message:"password did not match"
        }
    )
 
}
if(user.resetPasswordExpires < Date.now())
{
    res.status(401).json(
        {
            success:false,
            message:"please generate link again"
        }
    )
}
const hashpassword = await bcrypt.hash(password,10)

const updatePass = await User.findOneAndUpdate({token:token},
    {
        token:token,
        password:hashpassword,
        resetPasswordExpires:null

    },
    {new:true}
)

return res.status(200).json(
    {
        success:true,
        message:"password updated succesfully"
        
    }

)
}
catch(err)
{
    
   return  res.status(401).json(
        {
            success:false,
            message:"failed to update pass"
        }
    )

}

}