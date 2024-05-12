import { Request, Response } from "express";

class TweetController {
  create(req: Request, res: Response) {
    return res.json({ msg: "No create de Tweet" });
  }
  findAll() {
    console.log("no findAll de tweet");
  }
  // findAllFromFriends() {}
  update() {}
  delete() {}
}

export default new TweetController();
