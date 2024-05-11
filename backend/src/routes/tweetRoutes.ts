import { Router } from "express";
import tweetController from "../controllers/tweetController";
import loginRequired from "../middlewares/loginRequired";

const router = Router();

router.post("/", loginRequired.validate, tweetController.create);
router.get("/", loginRequired.validate, tweetController.findAll);
router.get("/friends", loginRequired.validate, tweetController.findAll);
router.put("/", loginRequired.validate, tweetController.update);
router.delete("/", loginRequired.validate, tweetController.delete);

export default router;
