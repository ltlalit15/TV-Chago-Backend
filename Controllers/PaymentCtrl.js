// controllers/paymentController.js
import Payment from "../Models/PaymentModel.js";
import Service from "../Models/ServiceModel.js"; // Import your Service model
import asyncHandler from "express-async-handler";

export const getAllPayments = asyncHandler(async (req, res) => {
  // Step 1: Get all payments
  const payments = await Payment.find()
  res.status(200).json(payments);
});

// Add new payment
// export const addPayment = asyncHandler(async (req, res) => {
//   const {
//     paymentId,
//     intent,
//     links,
//     payer,
//     purchase_units,
//     status,
//     update_time,
//     create_time,
//     serviceIds 
//   } = req.body;

//   if (!paymentId || !intent || !status || !update_time || !create_time || !serviceIds) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required fields",
//     });
//   }

//   const newPayment = await Payment.create({
//     paymentId,
//     intent,
//     links,
//     payer,
//     purchase_units,
//     status,
//     update_time,
//     create_time,
//     serviceIds
//   });

//   res.status(201).json({
//     success: true,
//     message: "Payment added successfully",
//     data: newPayment,
//   });
// });

export const addPayment = asyncHandler(async (req, res) => {
  const {
    details,
    services,
    total
  } = req.body;



  const newPayment = await Payment.create({
    details,
    services,
    total
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

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "orderStatus is required",
      });
    }

    const data = await Payment.findByIdAndUpdate(
      req.params.id,
      { orderStatus }, // only update status field
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      data,
      message: "Order status updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Order status not updated",
      success: false,
    });
  }
});