const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );

   const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();

});

module.exports = protect;