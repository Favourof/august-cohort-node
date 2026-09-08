import dotenv from "dotenv";
dotenv.config();

export const envObj = {
  mongoUrl: process.env.MONGODB_URI,
  port: process.env.PORT,
};
