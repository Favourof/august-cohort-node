import express from "express";
import {
  addProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.js";
import { upload } from "../utils/multer.js";

const route = express.Router();

route.post("/", upload.single("image"), addProduct);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);

export default route;
