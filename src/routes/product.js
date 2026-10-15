import express from "express";
import {
  addProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.js";
import { upload } from "../utils/multer.js";
import { addProductValidator } from "../validator/product.js";

const route = express.Router();

route.post("/", upload.single("image"), addProductValidator, addProduct);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);

export default route;
