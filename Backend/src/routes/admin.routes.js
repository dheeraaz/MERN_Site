import { Router } from "express";

import { verifyJWT } from '../middlewares/auth.middleware.js'
import { isAdmin } from "../middlewares/admin.middleware.js";
import { getAllUsers, getUserById, editUser, deleteUser, getAllContacts, deleteContact } from "../controllers/admin.controller.js";

import { validate } from "../middlewares/zod_validator.middleware.js";
import { editUserSchema } from "../validators/validator.schema.js";

const router = Router();

router.route('/allusers').get(verifyJWT, isAdmin, getAllUsers);
router.route("/edituser/:userId").patch(verifyJWT, isAdmin, validate(editUserSchema), editUser);
router.route("/getuserbyid/:userId").get(verifyJWT, isAdmin, getUserById);
router.route('/deleteuser/:userId').delete(verifyJWT, isAdmin, deleteUser);
router.route("/allcontacts").get(verifyJWT, isAdmin, getAllContacts);
router.route('/deletecontact/:contactId').delete(verifyJWT, isAdmin, deleteContact);


export default router;