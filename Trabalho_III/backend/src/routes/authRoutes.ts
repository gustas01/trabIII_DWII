import { Router } from "express";
import authController from "../controllers/authController";
import createUserValidations from "../middlewares/createUserValidations";
import loginUserValidations from "../middlewares/loginUserValidations";

const router = Router();

router.post("/register", createUserValidations, authController.register);
router.post("/login", loginUserValidations, authController.login);
router.post("/logout", authController.logout);

export default router;
