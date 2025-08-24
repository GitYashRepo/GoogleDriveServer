// middleware/upload.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // store all in uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Allow images, videos, pdf, zip, music etc.
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Images
    "image/jpeg", "image/png", "image/gif", "image/webp",
    // Videos
    "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo",
    // Documents
    "application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    // Archives
    "application/zip", "application/x-rar-compressed",
    // Audio
    "audio/mpeg", "audio/wav", "audio/ogg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported"), false);
  }
};

const upload = multer({ storage, fileFilter });
export default upload;
