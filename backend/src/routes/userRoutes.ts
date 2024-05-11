import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/me", userController.me);
router.put("/", userController.update);
router.delete("/", userController.delete);

export default router;
