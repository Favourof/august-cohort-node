import mongoose from "mongoose";
import { envObj } from "./envConfig.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envObj.mongoUrl);
    if (conn) {
      console.log("MongoDB connected Successfully");
    }
  } catch (error) {
    console.log("MongoDb Error", error.message);
  }
};
