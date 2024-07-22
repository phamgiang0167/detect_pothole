import express from "express";
const router = express.Router();
import {
  uploadFile,
  getResult
} from "../controller/fileController.js";
import multer
  from "multer";

const storage = multer.memoryStorage();

router.post('/analyst', uploadFile);
router.get('/result', getResult);

export default router;
