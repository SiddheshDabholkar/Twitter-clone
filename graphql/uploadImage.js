const cloudinary = require("cloudinary").v2;

console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = {
  uploadImage: async (photo) => {
    try {
      const result = await cloudinary.uploader.upload(photo, {
        allowed_formats: ["jpg", "png"],
        public_id: "",
        folder: "twitter",
      });
      return result.url;
    } catch (e) {
      throw new Error(e);
    }
  },
};
