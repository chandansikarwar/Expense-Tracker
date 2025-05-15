const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const dotenv = require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SK,
});

const storage = multer.memoryStorage();

async function imageUploadUtil(fileBuffer, mimetype) {
  const base64 = fileBuffer.toString("base64");
  const dataURI = `data:${mimetype};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: "image",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
