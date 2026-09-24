import express from "express";
import { authMe, login, register } from "../controllers/user.js";
import { jwtValidator } from "../middlewares/jwtValidator.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/me", jwtValidator, authMe);

export default route;
