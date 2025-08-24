import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

export default File;
