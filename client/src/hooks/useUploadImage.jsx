import { useState, useEffect } from "react";

export default function useUploadImage(selectedPhoto) {
  const [assetUrl, setAssetUrl] = useState("");
  const UPLOAD_PRESET = process.env.UPLOAD_PRESET;
  const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;

  useEffect(() => {
    if (selectedPhoto) {
      const data = new FormData();
      data.append("file", selectedPhoto);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUDINARY_NAME);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAssetUrl(data.url);
          // console.log("photo data.url", data.url);
        });
      // .catch((err) => console.log(err));
    }
  }, [selectedPhoto]);
  return assetUrl;
}
