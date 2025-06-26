// routes/paymentRoutes.js
import express from "express";
import {
  getAllPayments,
  addPayment,
  updatePayment,
  deletePayment,
} from "../Controllers/PaymentCtrl.js";

const router = express.Router();

router.get("/payments", getAllPayments);
router.post("/payments", addPayment);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);

export default router;
