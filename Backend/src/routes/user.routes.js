import { Router } from "express";
// import { userLogin, userRegister } from "../controllers/user.controller.js";
import userController from "../controllers/user.controller.js";
import { validate } from "../middlewares/zod_validator.middleware.js";
import { loginSchema, signupSchema } from "../validators/validator.schema.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/isUserLoggedIn").get(userController.isUserLoggedIn);
router
  .route("/register")
  .post(validate(signupSchema), userController.userRegister);
router.route("/login").post(validate(loginSchema), userController.userLogin);
router.route("/logout").post(verifyJWT, userController.userLogout);

export default router;
