import { Request, Response } from 'express';
import ResponseDTO from 'src/dtos/ResponseDTO';
import { User } from 'src/entities/User';
import { UpdateUserDTO } from 'src/dtos/updateUserDTO';
import { userRepository } from '../repositories/userRepository';

class UserController {
  me(req: Request, res: Response) {
    return res.status(200).json({
      status: 200,
      content: req.body.user,
      success: true,
    } as ResponseDTO);
  }

  async update(req: Request, res: Response) {
    const { id } = req.body.user as User;
    const updateUserDTO = req.body;
    delete updateUserDTO.user;

    await userRepository.update(id, req.body);

    return res.status(200).json({
      status: 200,
      content: 'Usuário atualizado com sucesso!',
      success: true,
    } as ResponseDTO);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.body.user as User;

    await userRepository.delete(id);

    return res.status(200).json({
      status: 200,
      content: 'Usuário apagado com sucesso!',
      success: true,
    } as ResponseDTO);
  }
}

export default new UserController();
