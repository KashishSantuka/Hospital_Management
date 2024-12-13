import mongoose, { Schema } from "mongoose";

const medicineSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  quantity: {
    type: Number,
    required: true,
  },
  manufacture: {
    type: Date,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  pricing: {
    type: Number,
    required: true,
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
