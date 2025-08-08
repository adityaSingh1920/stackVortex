const cloudinary = require('cloudinary').v2;

exports.imageUpload = async (file, folder, height, quality) => {
    try {
        const options = {
            folder,
            resource_type: "auto", // Automatically detects the file type
        };

        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Image uploaded successfully:", result);
        return result;
    } catch (error) {
        console.error("Image upload failed:", error.message);
        throw error;
    }
};
