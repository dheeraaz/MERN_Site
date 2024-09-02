import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { Contact } from "../models/contact.model.js";

const postContact = asyncHandler(async (req, res) => {
  const { username, email, message } = req.body;

  // this is redundant code as I have already applied validation
  if ([username, email, message].some((field) => field.trim() === "")) {
    throw new apiError(400, "All Fields are required");
  }

  const sentMessage = await Contact.create({
    username,
    email,
    message,
  });

  return res
    .status(200)
    .json(new apiResponse(201, sentMessage, "Succesfully posted the message"));
});

export { 
  postContact,
 };
