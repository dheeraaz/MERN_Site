import { Router } from "express";
import { homeRoute } from "../controllers/home.controller.js";

const router = Router();

router.route("").get(homeRoute);

export default router;
