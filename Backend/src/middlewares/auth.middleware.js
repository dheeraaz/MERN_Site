import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new apiError(401, "User Is Not Authorized");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      // this error is first catched by the catch block below, since this error is not related to token expiry, the error is thrown to catch block of asynchandler
      throw new apiError(401, "Invalid Access Token");
    }

    // if the user is valid and available, add the user into req and send it to next()
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Token has expired, but proceed to clear cookie
      return res
        .status(200)
        .clearCookie("accessToken")
        .json(new apiResponse(200, null, "Session expired, logged out"));
    } else {
      throw new apiError(401, "Invalid Token");
    }
  }
});
