const {body}=require("express-validator");

const registerValidation=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min:3})
    .withMessage("Name must be at least 3 characters"),
  
     body("email")
     .trim()
     .isEmail()
     .withMessage("Please enter a valid email")
     .normalizeEmail(),

     body("password")
     .trim()
     .isLength({min:6})
     .withMessage("Password must be at least 6 characters"),

];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports={registerValidation,loginValidation};