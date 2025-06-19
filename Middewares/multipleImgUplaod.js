import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dfporfl8y",
    api_key:"244749221557343",
    api_secret: "jDkVlzvkhHjb81EvaLjYgtNtKsY",
});

const uploadCloudinary = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json('No files were uploaded');
        }

        const uploadedImages = [];

        for (const file of req.files ? req.files : []) {
            const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            const result = await cloudinary.uploader.upload(dataUrl);

            uploadedImages.push(
                 result.secure_url
            );
        }
        req.uploadedImages = uploadedImages; // Store uploaded image URLs in request object
        next(); // Move to the next middleware/controller
    } catch (error) {
        res.status(500).json({ message: "File was not uploaded in backend", error: error.message });
    }
};

export default uploadCloudinary;
