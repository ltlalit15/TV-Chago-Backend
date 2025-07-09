import asyncHandler from "express-async-handler";
import Auth from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const logins = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email });
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { userId: user._id }, // add role if added to schema
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            token,

        }
    });
});



export const profile = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { firstName, lastName, phone, address, password } = req.body;

    const user = await Auth.findById(id);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // Password update if provided
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
            id: updatedUser._id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            address: updatedUser.address
        }
    });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await Auth.findById(id).select("-password"); 
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user
  });
});
