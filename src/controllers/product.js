import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, stock } = req.body;
    if (!title || !description || !price || !category || !image || !stock) {
      return res
        .status(401)
        .json({ status: false, message: " ALl field are Required" });
    }

    const product = await Product.create(req.body);
    return res
      .status(200)
      .json({ status: true, message: "PRoduct Added Successfully ", product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
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
