import { Router } from "express";
import { getServiceDetails } from "../controllers/service.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/getservices").get(getServiceDetails);

export default router;
