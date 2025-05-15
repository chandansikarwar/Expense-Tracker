// utils/cloudinaryDestroy.js
const cloudinary = require("cloudinary").v2;

const destroyImage = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
    console.log(`✅ Image ${publicId} deleted from Cloudinary`);
  } catch (error) {
    console.error(`❌ Failed to delete image ${publicId}:`, error);
  }
};

module.exports = destroyImage;
