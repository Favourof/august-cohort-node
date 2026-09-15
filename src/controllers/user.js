import User from "../models/user.js";
import bcrypt from "bcrypt";

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

    await User.create({ ...req.body, password: hashPassword });

    return res.status(201).json({
      status: true,
      message: "Account Created Successfully",
      user: { firstName, lastName, email },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
