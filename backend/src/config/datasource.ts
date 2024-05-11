import { Tweet } from "../entities/Tweet";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: String(process.env.DB_URL),
  logging: true,
  entities: [User, Tweet],
  migrations: [],
});
