import OrderModel from "../Models/OrderModel.js";
import PaymentModel from "../Models/PaymentModel.js";
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


export const deleteBulkOrders = asyncHandler(async (req, res) => {
  const { day } = req.body;

  if (!day) {
    return res.status(400).json({ success: false, message: "Day is required" });
  }

  const services = await OrderModel.find({ orderStatus: "1" });
  let updatedCount = 0;

  for (const service of services) {
    const createdAt = new Date(service.createdAt);
    const expireAt = new Date(createdAt);
    expireAt.setDate(expireAt.getDate() + parseInt(day));

    await OrderModel.findByIdAndUpdate(service._id, { expireAt });
    updatedCount++;
  }

  res.status(200).json({
    success: true,
    message: `${updatedCount} records updated with expireAt date.`,
  });
});

export const notification = asyncHandler(async (req, res) => {
  try {
    const { notification, id} = req.body;

    if (!notification || !Array.isArray(id) || id.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notification and valid IDs are required",
      });
    }

    const result = await PaymentModel.updateMany(
      { _id: { $in: id } },
      { $set: { notification } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching orders found to update",
      });
    }

    res.status(200).json({
      data: result,
      message: "Notifications updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Notifications not updated",
      success: false,
    });
  }
});
