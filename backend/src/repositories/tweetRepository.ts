import { AppDataSource } from "src/config/datasource";
import { Tweet } from "src/entities/Tweet";

export const tweetRepository = AppDataSource.getRepository(Tweet);
