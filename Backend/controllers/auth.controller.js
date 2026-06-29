const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV==="production" ? "none":"lax",

  maxAge: 7 * 24 * 60 * 60 * 1000,
};

  
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Generate Verification Token
  const verificationToken = crypto
    .randomBytes(32)
    .toString("hex");

  // Create User
  const user = await User.create({
    name,
    email,
    password,

    verificationToken,

    verificationTokenExpiry:
      Date.now() + 60 * 60 * 1000, // 1 Hour
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(
      500,
      "User registration failed"
    );
  }

  // Verification URL
  const verifyUrl =
    `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  // Send Email
  await sendEmail({
    to: createdUser.email,

    subject: "Verify Your Taskora Account",

    html: `
      <div style="font-family:Arial,sans-serif;padding:30px">
        <h2>Welcome to Taskora 👋</h2>

        <p>
          Thanks for registering.
          Please verify your email by clicking the button below.
        </p>

        <a
          href="${verifyUrl}"
          style="
            display:inline-block;
            background:#10b981;
            color:#fff;
            padding:12px 24px;
            border-radius:8px;
            text-decoration:none;
            margin:20px 0;
          "
        >
          Verify Email
        </a>

        <p>
          This link will expire in 1 hour.
        </p>
      </div>
    `,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      null,
      "Registration successful. Please verify your email."
    )
  );
});


const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid Email or Password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid Email or Password");
    }

    if (!user.isVerified) {
    throw new ApiError(
        403,
        "Please verify your email before logging in."
    );
}

    const token = generateToken(user._id);

    // user.password = undefined; //pehle
    const userData = user.toObject();  //ab
    delete userData.password;

    return res
        .cookie("token", token, authCookieOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                     user: userData,
                },
                "Login Successful"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { user },
      "User fetched successfully"
    )
  );
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpiry: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Invalid or expired verification link."
    );
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Email verified successfully."
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV==="production" ? "none":"lax",
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Logout Successful"
      )
    );
});


 

module.exports = {
  registerUser,
  loginUser,logoutUser,getCurrentUser,verifyEmail,
};