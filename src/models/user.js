import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName is Required"],
    trim: true,
    minLength: [3, "FirstName Can not be lesser than 3 Characters"],
    maxLength: [30, "FirstName must not be greater than 30 Characters"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is Required"],
    trim: true,
    minLength: [3, "lastName Can not be lesser than 3 Characters"],
    maxLength: [30, "lastName must not be greater than 30 Characters"],
  },
  email: {
    type: String,
    required: [true, "email is Required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "Password Is Required"],
    minLength: 8,
  },
  phoneNumber: {
    type: Number,
    minLength: 11,
  },
  address: [addressSchema],
  //   address: [
  //     {
  //       street: { type: String, required: true },
  //       city: { type: String, required: true },
  //       state: { type: String, required: true },
  //       postalCode: { type: String, required: true },
  //       country: { type: String, required: true },
  //       isDefault: { type: Boolean, default: false },
  //     },
  //   ],
});

export default mongoose.model("user", userSchema);
