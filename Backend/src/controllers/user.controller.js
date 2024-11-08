import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const isUserLoggedIn = asyncHandler(async (req, res) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new apiError(401, "User Not Logged In");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

  const loggedInUser = await User.findById(decodedToken.userId).select(
    "-password"
  );

  if (!loggedInUser) {
    throw new apiError(401, "User Not Found");
  }

  return res
    .status(200)
    .json(new apiResponse(201, loggedInUser, "User Is Logged In"));
});

// registering user
const userRegister = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;

  if ([username, email, phone, password].some((item) => item?.trim() === "")) {
    throw new apiError(400, "All Fields Are Required");
  }

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new apiError(409, "User With Same Email Already Exists");
  }

  const newUser = await User.create({
    username,
    email,
    phone,
    password,
  });

  const createdUser = await User.findById(newUser._id).select("-password");

  if (!createdUser) {
    throw new apiError(500, "something went wrong while creating user");
  }

  // for sending cookie in browser
  // httpOnly = true, that is cookie is only accessible using http protocol, if someone tries to steal cookie using browser automation, he cannot access it
  // secure => true, that is cookie is transmitted only if the protocol used is https, [http ma set hudaina] || since production https use hunxa ani development ma use http
  const option = {
    httpOnly: true,
    // secure: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: "None",
  };

  const accessToken = createdUser.generateAccessToken();

  // since we have set cookie as soon as the user has registered, we dont need to set send data
  // as we can fetch data using token
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(new apiResponse(201, createdUser, "User Registered Successfully"));
});

// user loginn
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "email and password is required");
  }

  const user = await User.findOne({ email });

  if (!user) throw new apiError(404, "User doesnt exists");

  // validating password
  if (!(await user.isPasswordCorrect(password))) {
    throw new apiError(401, "Invalid User Credentials");
  }

  // Again finding the logged in user and removing password from it
  const loggedInUser = await User.findById(user._id).select("-password");

  //creating access token
  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: "None",
  };

  const accessToken = loggedInUser.generateAccessToken();

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(new apiResponse(200, loggedInUser, "User Logged In Successfully"));
});

//user logout
const userLogout = asyncHandler(async (req, res) => {
  // const user = req.user;

  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only true in production
    sameSite: "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", option)
    .json(
      new apiResponse(
        201,
        { user: req.user.username },
        "User Logged Out SuccessFully"
      )
    );
});

// export {
//     userLogin,
//     userRegister
// }

export default {
  isUserLoggedIn,
  userRegister,
  userLogin,
  userLogout,
};
