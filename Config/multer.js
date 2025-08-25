import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: "dwkerhtfs",
  api_key: "856991196368415",
  api_secret: "RaA3DSRzT3DGs0t4EnK2_EbizEo",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "google-drive-clone",
    resource_type: "auto", // handles images, videos, pdfs, etc.
  },
});

const upload = multer({ storage });

export default upload;
