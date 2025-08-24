import Router from "express";
import { UploadFile, GetFiles } from "../AppController/File.js";
import upload from "../Config/multer.js";
const router = Router();

router.post("/upload", upload.single("file"), UploadFile);
router.get("/", GetFiles);

export default router;
