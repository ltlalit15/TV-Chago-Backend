// models/PaymentModel.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {

    details: [],
    services: {},
    notification: { type: String, default: 0 },

    total: { type: Number },
    orderStatus: {
      type: String,
      default: 0
    }

  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
