import { Router } from "express";
import tweetController from "../controllers/tweetController";

const router = Router();

router.post("/", tweetController.create);
router.get("/", tweetController.findAll);
router.get("/friends", tweetController.findAll);
router.put("/", tweetController.update);
router.delete("/", tweetController.delete);

export default router;
