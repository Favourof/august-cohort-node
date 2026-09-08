import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least three Character"],
      maxLength: [30, "Title must not be greater than 30 Character"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minLength: [12, "Description must be at least three Character"],
      maxLength: [120, "Description must not be greater than 30 Character"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [100, "Price can not be lesser than 100"],
      max: [1000000, "price can not be greater Than 10000000"],
    },
    category: {
      type: String,
      enum: ["phone", "laptop", "tab", "power bank"],
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    image: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("product", productSchema);
