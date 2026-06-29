const express = require("express");

const router = express.Router();

const { registerUser,loginUser,logoutUser, getCurrentUser,verifyEmail, } = require("../controllers/auth.controller");

const { registerValidation,loginValidation } = require("../validators/auth.validator");

const validate = require("../middleware/validate.middleware");
const protect = require("../middleware/auth.middleware");

router.post( "/register",registerValidation, validate,registerUser);
router.post("/login",loginValidation,validate,loginUser);
router.get("/verify-email/:token", verifyEmail);
router.get("/me", protect, getCurrentUser);
router.post("/logout",protect,logoutUser);


module.exports = router;

