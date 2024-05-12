import { CreateUserDTO } from "src/dtos/createUserDTO";
import { userRepository } from "../repositories/userRepository";
import { Request, Response } from "express";
import ResponseDTO from "src/dtos/ResponseDTO";
import bcryptjs from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "../entities/User";
import { LoginDTO } from "src/dtos/loginDTO";

class AuthController {
  async register(req: Request, res: Response) {
    const user: CreateUserDTO | null = req.body as CreateUserDTO;

    user.password = await bcryptjs.hash(
      user.password,
      await bcryptjs.genSalt(8)
    );

    await userRepository.save(user);

    res.status(201).json({
      status: 201,
      content: "Usuário criado com sucesso!",
      success: true,
    } as ResponseDTO);
  }

  async login(req: Request, res: Response) {
    const login: LoginDTO | null = req.body as LoginDTO;

    const user: User | null = await userRepository.findOne({
      where: { email: login.email },
    });

    const password: string = String(user?.password);
    const id: string = String(user?.id);

    if (!user && !(await bcryptjs.compare(login.password, password)))
      res.status(401).json({
        status: 401,
        content: "Usuário ou senha inválidos",
        success: false,
      } as ResponseDTO);

    const token: string = sign({ id }, String(process.env.TOKEN_SECRET), {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      status: 200,
      content: "Usuário logado com sucesso",
      success: true,
    } as ResponseDTO);
  }

  async logout(req: Request, res: Response) {
    res.cookie("token", "", {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
      maxAge: 0,
    });

    req.body.user = undefined;

    return res.status(200).json({
      status: 200,
      content: "Logout feito com sucesso!",
      success: true,
    } as ResponseDTO);
  }
}

export default new AuthController();
