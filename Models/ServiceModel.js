import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,

    },
    price: {
      type: String,

    },
    duration: {
      type: String,

    },

  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
