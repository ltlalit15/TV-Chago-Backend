import ServiceModel from "../Models/ServiceModel.js";
import asyncHandler from "express-async-handler";

// ➤ Get all services
export const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await ServiceModel.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ➤ Add new service
export const addService = asyncHandler(async (req, res) => {
  try {
    const { serviceName, price, duration } = req.body;

    if (!serviceName || !price || !duration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newService = await ServiceModel.create({
      serviceName,
      price,
      duration,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully",
      data: newService,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ➤ Update service
export const updateService = asyncHandler(async (req, res) => {
  try {
    const updated = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ➤ Delete service
export const deleteService = asyncHandler(async (req, res) => {
  try {
    const deleted = await ServiceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


