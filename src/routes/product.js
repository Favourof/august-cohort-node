import express from "express";
import {
  addProduct,
  deleteSingleProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.js";
import { upload } from "../utils/multer.js";
import { addProductValidator } from "../validator/product.js";
import { jwtValidator } from "../middlewares/jwtValidator.js";

const route = express.Router();

route.post(
  "/",
  upload.single("image"),
  addProductValidator,
  jwtValidator,
  addProduct,
);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);
route.delete("/:id", jwtValidator, deleteSingleProduct);

export default route;
