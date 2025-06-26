// models/PaymentModel.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    serviceIds: [],
    intent: {
      type: String,
      required: true,
    },
    links: {
      type: [Object], // Define schema if needed
      default: [],
    },
    payer: {
      type: [Object], // Define schema if needed
      default: [],
    },
    purchase_units: {
      type: [Object], // Define schema if needed
      default: [],
    },
    status: {
      type: String,
      required: true,
    },
    update_time: {
      type: String,
      required: true,
    },
    create_time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
