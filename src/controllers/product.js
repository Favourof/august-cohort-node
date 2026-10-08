import cloudinary from "../config/cloudinary.js";
import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  const file = req.files || req.file;
  console.log(file);

  try {
    const { title, description, price, category, stock } = req.body;
    if (
      !title ||
      !description ||
      price === undefined ||
      !category ||
      !file ||
      stock === undefined
    ) {
      return res
        .status(401)
        .json({ status: false, message: " ALl field are Required" });
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
    });

    return res.status(201).json({
      status: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
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
