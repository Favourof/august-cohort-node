import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";
import { validationResult } from "express-validator";
import User from "../models/user.js";

export const addProduct = async (req, res) => {
  const userId = req.user;
  const file = req.files || req.file;
  console.log(userId);

  const error = validationResult(req);
  // console.log(error);

  if (!error.isEmpty()) {
    console.log(error.errors);

    return res.status(400).json({ error: error.errors?.[0].msg });
  }

  try {
    const { title, description, price, category, stock } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "user not found" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "August Cohort" },
        (error, uploadResult) => {
          if (error) return reject(error);
          resolve(uploadResult);
        },
      );

      // multer's memoryStorage puts the uploaded bytes on file.buffer.
      stream.end(file.buffer);
    });

    console.log("Cloudinary upload result:", result);

    const product = await Product.create({
      title,
      description,
      price,
      category,
      stock,
      image: [result.secure_url],
      imageId: result.public_id,
      user: userId,
    });

    return res.status(201).json({
      status: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      status: true,
      message: "Fetch Product Successfully",
      productLength: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    console.log(req.params);

    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Fetch Product Successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user; // Assuming this comes from your auth middleware

    // Optimize: Find and delete in a single database query while checking ownership
    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found or unauthorized to delete",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Delete Product Error:", error);
    // 500 is typically better for server/db errors than 400
    return res.status(500).json({ status: false, message: error.message });
  }
};
