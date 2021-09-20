import { useState, useEffect } from "react";

export default function useUploadImage(selectedPhoto) {
  const [assetUrl, setAssetUrl] = useState("");
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME;
  const CLOUDINARY_API = process.env.REACT_APP_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.REACT_APP_API_SECRET;

  useEffect(() => {
    if (selectedPhoto !== "") {
      const data = new FormData();
      data.append("file", selectedPhoto);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUDINARY_NAME);
      data.append("api_key", CLOUDINARY_API);
      data.append("api_secret", CLOUDINARY_API_SECRET);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: "post",
        body: data,
        mode: "cors",
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
