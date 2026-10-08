import dotenv from "dotenv";
dotenv.config();

export const envObj = {
  mongoUrl: process.env.MONGODB_URI,
  port: process.env.PORT,
  expireIn: process.env.EXPIRE_IN,
  jwtSecret: process.env.JWT_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_SECRET_KEY,
};
