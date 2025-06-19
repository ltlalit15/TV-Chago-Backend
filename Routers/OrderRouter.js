import express from "express";
import {
  getallorders,
  addorders,
  getallordersName,
  deleteorders,
  updateorders,
  updateordersStatus,
  sendMails
} from "../Controllers/OrderController.js";

const router = express.Router();

router.get("/orders", getallorders);
router.get("/order", getallordersName);
router.post("/orders", addorders);
router.put("/orders/:id", updateorders);
router.patch("/updateordersstatus/:id", updateordersStatus);
router.patch("/updateenquiryStatus", sendMails);
router.delete("/orders/:id", deleteorders);

export default router;
