import { Request, Response } from 'express';
import ResponseDTO from 'src/dtos/ResponseDTO';
import { User } from 'src/entities/User';
import { tweetRepository } from '../repositories/tweetRepository';
import { Tweet } from 'src/entities/Tweet';

class TweetController {
  async create(req: Request, res: Response) {
    try {
      const user: User = req.body.user;
      await tweetRepository.save({ ...req.body, author: user });
      return res.status(201).json({
        status: 201,
        content: 'Tweet criado com sucesso!',
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.driverError,
        success: false,
      } as ResponseDTO);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      return res.status(200).json({
        status: 200,
        content: await tweetRepository.find({
          relations: { author: true, likes: true },
          select: {
            author: { id: true, firstName: true, lastName: true, email: true },
            likes: { id: true },
          },
        }),
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.driverError,
        success: false,
      } as ResponseDTO);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user: User = req.body.user;
      const tweetId = req.params.id;
      const tweet: Tweet | null = await tweetRepository.findOne({
        where: { id: tweetId },
        relations: { author: true },
      });

      if (tweet === null)
        return res.status(403).json({
          status: 403,
          content: 'Tweet inexistente',
          success: false,
        } as ResponseDTO);

      if (user.id !== tweet?.author.id)
        return res.status(403).json({
          status: 403,
          content: 'Você não pode alterar tweet do outro usuário',
          success: false,
        } as ResponseDTO);

      const updateTweetDTO = req.body;
      delete updateTweetDTO.user;

      await tweetRepository.update(tweetId, updateTweetDTO);

      return res.status(200).json({
        status: 200,
        content: 'Tweet atualizado com sucesso!',
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco: ' + e.driverError,
        success: false,
      } as ResponseDTO);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user: User = req.body.user;
      const tweetId = req.params.id;

      const tweet: Tweet | null = await tweetRepository.findOne({
        where: { id: tweetId },
        relations: { author: true },
      });

      if (tweet === null)
        return res.status(403).json({
          status: 403,
          content: 'Tweet inexistente',
          success: false,
        } as ResponseDTO);

      if (user.id !== tweet?.author.id)
        return res.status(403).json({
          status: 403,
          content: 'Você não pode apagar tweet do outro usuário',
          success: false,
        } as ResponseDTO);

      await tweetRepository.delete(tweetId);

      return res.status(200).json({
        status: 200,
        content: 'Tweet deletado com sucesso!',
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco',
        success: false,
      } as ResponseDTO);
    }
  }

  async findAllFromAuthor(req: Request, res: Response) {
    try {
      const user: User = req.body.user;

      const tweets: Tweet[] | null = await tweetRepository.find({
        where: { author: user },
        relations: { author: true, likes: true },
        select: {
          author: { id: true, firstName: true, lastName: true, email: true },
          likes: { id: true },
        },
      });

      return res.status(200).json({
        status: 200,
        content: tweets,
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco',
        success: false,
      } as ResponseDTO);
    }
  }

  async likeOrDislike(req: Request, res: Response) {
    try {
      const user: User = req.body.user;
      const tweetId = req.params.id;
      const tweet: Tweet | null = await tweetRepository.findOne({
        where: { id: tweetId },
        relations: { author: true, likes: true },
      });

      if (tweet === null)
        return res.status(403).json({
          status: 403,
          content: 'Tweet inexistente',
          success: false,
        } as ResponseDTO);

      if (tweet.likes.some((t) => t.id === user.id))
        tweet.likes.splice(tweet.likes.indexOf(user), 1);
      else tweet.likes.unshift(user);

      await tweetRepository.save(tweet);

      return res.status(200).json({
        status: 200,
        content: 'Like ou deslike',
        success: true,
      } as ResponseDTO);
    } catch (e: any) {
      return res.status(400).json({
        status: 400,
        content: 'Falha no banco',
        success: false,
      } as ResponseDTO);
    }
  }
}

export default new TweetController();
