import { AppDataSource } from '../config/datasource';
import { Tweet } from '../entities/Tweet';

export const tweetRepository = AppDataSource.getRepository(Tweet);
