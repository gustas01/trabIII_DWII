import { Request, Response, NextFunction } from 'express';
import ResponseDTO from 'src/dtos/ResponseDTO';

export default async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password)
    return res.status(400).json({
      status: 400,
      content: 'Todos os campos são obrigatórios!',
      success: false,
    } as ResponseDTO);

  if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /.{8,}/.test(password)))
    return res.status(400).json({
      status: 400,
      content: 'A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 minúscula',
      success: false,
    } as ResponseDTO);

  return next();
};
