import jwt from "jsonwebtoken";
import { envObj } from "../config/envConfig.js";

export const jwtValidator = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return res
        .status(401)
        .json({ status: false, message: "Token not Found" });
    }
    const token = header.split(" ")[1];
    // console.log(token);
    try {
      const decoded = await jwt.verify(token, envObj.jwtSecret);
      req.user = decoded.userId;
      //   console.log(decoded);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, message: error.message });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
