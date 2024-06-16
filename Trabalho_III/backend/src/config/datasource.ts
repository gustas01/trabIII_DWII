import { Tweet } from "../entities/Tweet";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import "reflect-metadata";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: String(process.env.DB_URL),
  synchronize: true,
  // logging: true,
  entities: [User, Tweet],
  migrations: [],
});
