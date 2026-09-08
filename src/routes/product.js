import express from "express";
import { addProduct, getAllProduct } from "../controllers/product.js";

const route = express.Router();

route.post("/", addProduct);
route.get("/", getAllProduct);

export default route;
