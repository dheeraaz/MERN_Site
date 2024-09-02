import { Router } from "express";

import { validate } from "../middlewares/zod_validator.middleware.js";
import { contactSchema } from "../validators/validator.schema.js";

import { postContact} from "../controllers/contact.controller.js";


const router = Router();

router.route("/postcontact").post(validate(contactSchema), postContact);

export default router;
