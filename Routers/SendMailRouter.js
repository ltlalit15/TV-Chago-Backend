import express from "express";
import multer from "multer";

const storage = multer.memoryStorage(); // for buffer uploads
const upload = multer({ storage });

import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../Controllers/SendMailCtrl.js";
import { uploadSingleImageToCloudinary } from "../Middleware.js";

const router = express.Router();

router.get("/sendmail", getAllServices);                           // Get all mail logs
router.post("/sendmail", uploadSingleImageToCloudinary, upload.single("image"), addService);     // Add new email log with image
router.put("/sendmail/:id", updateService);                       // Update mail record
router.delete("/sendmail/:id", deleteService);                    // Delete mail record

export default router;
