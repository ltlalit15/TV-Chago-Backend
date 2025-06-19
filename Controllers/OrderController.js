import OrderModel from "../Models/OrderModel.js";
import asyncHandler from "express-async-handler";

// ➤ Get all orders
export const getallorders = asyncHandler(async (req, res) => {
  try {
    const data = await OrderModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ➤ Get all order customer names (or emails etc.)
export const getallordersName = asyncHandler(async (req, res) => {
  try {
    const data = await OrderModel.find();
    const result = data.map((order) => ({
      fullName: order.customerInfo.fullName,
      email: order.customerInfo.email,
    }));
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ➤ Add order
export const addorders = asyncHandler(async (req, res) => {
  try {
    const data = await OrderModel.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ➤ Update order
export const updateorders = asyncHandler(async (req, res) => {
  try {
    const data = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      data,
      message: "Order updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Order not updated",
      success: false,
    });
  }
});

export const updateordersStatus = asyncHandler(async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "orderStatus is required",
      });
    }

    const data = await OrderModel.findByIdAndUpdate(
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

export const sendMails = asyncHandler(async (req, res) => {
  try {
    const { id, enquiryStatus } = req.body;

    if (!enquiryStatus) {
      return res.status(400).json({
        success: false,
        message: "enquiryStatus is required",
      });
    }

    const userData = await OrderModel.findById(id);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { enquiryStatus },
      { new: true }
    );

    // Email part removed as requested

    res.status(200).json({
      data: updatedOrder,
      message: "Enquiry status updated successfully",
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



// ➤ Delete order
export const deleteorders = asyncHandler(async (req, res) => {
  try {
    const data = await OrderModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data,
      message: "Order deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Order not deleted",
      success: false,
    });
  }
});
