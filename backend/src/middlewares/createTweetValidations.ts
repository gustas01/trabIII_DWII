import { Request, Response, NextFunction } from 'express';
import ResponseDTO from 'src/dtos/ResponseDTO';
import { Tweet } from 'src/entities/Tweet';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { content } = req.body as Tweet;

  if (!content)
    return res.status(400).json({
      status: 400,
      content: 'Todos os campos são obrigatórios!',
      success: false,
    } as ResponseDTO);

  return next();
};
