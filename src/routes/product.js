import express from "express";
import {
  addProduct,
  getAllProduct,
  getSingleProduct,
} from "../controllers/product.js";

const route = express.Router();

route.post("/", addProduct);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);

export default route;
