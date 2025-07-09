import EmailLogModel from "../Models/sendMailModel.js";
import asyncHandler from "express-async-handler";

// ➤ Get all email logs
export const getAllServices = asyncHandler(async (req, res) => {
  try {
    const logs = await EmailLogModel.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add new email log
export const addService = asyncHandler(async (req, res) => {
  try {
    const { email, message, orderId, status, date } = req.body;
    const img = req.uploadedImageUrl

    const newLog = await EmailLogModel.create({
      email,
      message,
      orderId,
      status,
      date,
      image: img
    });
    res.status(201).json({
      success: true,
      message: "Email log added successfully",
      data: newLog,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ➤ Update email log
export const updateService = asyncHandler(async (req, res) => {
  try {
    const updated = await EmailLogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Email log updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ➤ Delete email log
export const deleteService = asyncHandler(async (req, res) => {
  try {
    const deleted = await EmailLogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Email log deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
