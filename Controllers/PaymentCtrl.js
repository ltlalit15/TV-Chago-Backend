// controllers/paymentController.js
import Payment from "../Models/PaymentModel.js";
import asyncHandler from "express-async-handler";

// Get all payments
export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json(payments);
});

// Add new payment
export const addPayment = asyncHandler(async (req, res) => {
  const {
    paymentId,
    intent,
    links,
    payers,
    purchase_units,
    status,
    update_time,
    create_time,
  } = req.body;

  if (!paymentId || !intent || !status || !update_time || !create_time) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const newPayment = await Payment.create({
    paymentId,
    intent,
    links,
    payers,
    purchase_units,
    status,
    update_time,
    create_time,
  });

  res.status(201).json({
    success: true,
    message: "Payment added successfully",
    data: newPayment,
  });
});

// Update payment
export const updatePayment = asyncHandler(async (req, res) => {
  const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Payment updated successfully",
    data: updated,
  });
});

// Delete payment
export const deletePayment = asyncHandler(async (req, res) => {
  const deleted = await Payment.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Payment not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Payment deleted successfully",
    data: deleted,
  });
});
