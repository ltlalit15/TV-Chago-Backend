import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  username: { type: String },
  type: { type: String },
  service: { type: String },
});

// const serviceSchema = new mongoose.Schema({
//   quantity: { type: Number },
//   accounts: { type: [accountSchema] },
//   price: { type: Number },
//   total: { type: String }, // .toFixed(2) gives string
// });

const orderSchema = new mongoose.Schema(
  {
    services: {},
    total: { type: Number },
    paymentMethod: { type: String },
    bankName: { type: String },
    orderStatus: { type: String,default:0 },
    notification: { type: String,default:0 },
    enquiryStatus: { type: String },
    customerInfo: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    expireAt: Date,

  },
  { timestamps: true }
);
orderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Order", orderSchema);
