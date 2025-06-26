// controllers/paymentController.js
import Payment from "../Models/PaymentModel.js";
import Service from "../Models/ServiceModel.js"; // Import your Service model
import asyncHandler from "express-async-handler";

export const getAllPayments = asyncHandler(async (req, res) => {
  // Step 1: Get all payments
  const payments = await Payment.find();

  // Step 2: For each payment, populate its services
  const enrichedPayments = await Promise.all(
    payments.map(async (payment) => {
      const services = await Service.find({ _id: { $in: payment.serviceIds } });

      return {
        ...payment.toObject(), // Convert mongoose doc to plain object
        services, // attach actual service objects
      };
    })
  );

  res.status(200).json(enrichedPayments);
});

// Add new payment
export const addPayment = asyncHandler(async (req, res) => {
  const {
    paymentId,
    intent,
    links,
    payer,
    purchase_units,
    status,
    update_time,
    create_time,
    serviceIds 
  } = req.body;

  if (!paymentId || !intent || !status || !update_time || !create_time || !serviceIds) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const newPayment = await Payment.create({
    paymentId,
    intent,
    links,
    payer,
    purchase_units,
    status,
    update_time,
    create_time,
    serviceIds
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
