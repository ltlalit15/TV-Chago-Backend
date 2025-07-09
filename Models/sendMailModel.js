import mongoose from "mongoose";

const EmailLogSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    orderId: {
      type: String,
    },
    status: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true, // Includes createdAt and updatedAt
  }
);

const EmailLogModel = mongoose.model("EmailLog", EmailLogSchema);
export default EmailLogModel;
