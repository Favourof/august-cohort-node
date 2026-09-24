import User from "../models/user.js";
import bcrypt from "bcrypt";
import { userODM } from "../utils/userODM.js";
import jwt from "jsonwebtoken";
import { envObj } from "../config/envConfig.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    if (!firstName || !lastName || !password || !email) {
      return res
        .status(400)
        .json({ status: false, message: "All field are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "User already already Exist" });
    }
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    return res.status(201).json({
      status: true,
      message: "Account Created Successfully",
      user: userODM(newUser),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All field Required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credential" });
    }

    const token = await jwt.sign(
      { userId: existingUser._id },
      envObj.jwtSecret,
      { expiresIn: envObj.expireIn },
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfully",
      user: userODM(existingUser),
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
