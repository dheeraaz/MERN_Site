import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const getServiceDetails = asyncHandler(async (req, res) => {
  const services = await Service.find();

  // handling the case, if no service is found
  if (!services) {
    throw new apiError(500, "No services found, server error");
  }

  return res
    .status(200)
    .json(new apiResponse(201, services, "Successfully fetched services"));
});

export { getServiceDetails };
