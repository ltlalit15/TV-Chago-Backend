import express from "express";
import {
  getAllServices,
  addService,
  updateService,
  deleteService,
} from "../Controllers/ServiceCtrl.js";

const router = express.Router();

router.get("/services", getAllServices);
router.post("/services", addService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

export default router;
