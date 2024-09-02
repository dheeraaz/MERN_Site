import mongoose  from "mongoose";

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: String,
  provider: String,
});

export const Service = mongoose.model("Service", serviceSchema);
