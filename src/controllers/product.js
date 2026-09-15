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
