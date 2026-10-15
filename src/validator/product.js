import { body } from "express-validator";

export const addProductValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .isLength({ min: 3, max: 120 })
    .withMessage("Title can must be between 3-120 character "),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .isLength({ min: 3, max: 300 })
    .withMessage("Description can must be between 3-300 character "),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 100, max: 500000 })
    .withMessage("Price must be between 10 and 500,000"),
  body("category")
    .isString()
    .notEmpty()
    .withMessage("Category can not be empty")
    .isIn(["phone", "laptop", "tab", "power bank"])
    .withMessage("Invalid category type"),
  body("stock")
    .isNumeric()
    .withMessage("Must be a number")
    .isFloat({ min: 1, max: 5000 })
    .withMessage("stock must be between 1 and 5000"),
];
