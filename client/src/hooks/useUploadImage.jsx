import { useState, useEffect } from "react";
import { UPLOAD_PRESET, CLOUDINARY_NAME } from "../Keys";

export default function useUploadImage({ selectedPhoto }) {
  const [assetUrl, setAssetUrl] = useState("");

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
          console.log("photo data.url", data.url);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedPhoto]);
  return assetUrl;
}
