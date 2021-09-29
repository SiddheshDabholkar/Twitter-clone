const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drntday51",
  api_key: "119814624233554",
  api_secret: "kjkSq6TF7JsYkaPVzrrpVJfvYEs",
  secure: true,
});

module.exports = {
  uploadImage: async (photo) => {
    try {
      const result = await cloudinary.uploader
        .upload(photo, {
          allowed_formats: ["jpg", "png"],
          public_id: "",
          folder: "twitter",
        })
        .then((res) => {
          return res.secure_url;
        })
        .catch((e) => {
          console.log("error lol", e);
          throw new Error(e?.message);
        });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  },
};
