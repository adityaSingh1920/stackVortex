const cloudinary = require('cloudinary').v2;
require("dotenv").config();

const cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.NAME,
            
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log('Cloudinary connected successfully');
        // console.log(cloud_name);
    } catch (error) {
        console.log('Cloudinary connection failed:', error);
    }
};

module.exports = cloudinaryConnect;
