import File from "../Models/File.js";

// Upload any allowed file
const UploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const file = await File.create({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      url: req.file.path,
    });

    res.status(201).json({ message: "File uploaded", file });
  } catch (err) {
    res.status(500).json({ error: "Upload failed", details: err.message });
  }
};

// Get all uploaded files
const GetFiles = async (req, res) => {
  const files = await File.find().sort({ createdAt: -1 });
  res.json(files);
};

export { UploadFile, GetFiles };
