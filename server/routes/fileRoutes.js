import express from "express";
const router = express.Router();
import {
  uploadFile,
  getResult
} from "../controller/fileController.js";
import multer
  from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), uploadFile);
router.get('/result', getResult);

export default router;;
