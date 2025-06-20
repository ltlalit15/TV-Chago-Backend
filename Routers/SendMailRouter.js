import express from "express";
import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../Controllers/SendMailCtrl.js";

const router = express.Router();

router.get("/sendmail", getAllServices);         // Get all mail logs
router.post("/sendmail", addService);            // Add new email log
router.put("/sendmail/:id", updateService);      // Update mail record
router.delete("/sendmail/:id", deleteService);   // Delete mail record

export default router;
