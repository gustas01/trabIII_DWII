import { Request, Response } from 'express';
import ResponseDTO from 'src/dtos/ResponseDTO';

class TweetController {
  create(req: Request, res: Response) {
    try {
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.errors,
        success: true,
      } as ResponseDTO);
    }
  }

  findAll(req: Request, res: Response) {
    try {
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.errors,
        success: true,
      } as ResponseDTO);
    }
  }

  // findAllFromFriends() {}
  update(req: Request, res: Response) {
    try {
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.errors,
        success: true,
      } as ResponseDTO);
    }
  }

  delete(req: Request, res: Response) {
    try {
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.errors,
        success: true,
      } as ResponseDTO);
    }
  }
}

export default new TweetController();
