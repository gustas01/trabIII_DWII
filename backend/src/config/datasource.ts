import { Tweet } from "src/entities/Tweet";
import { User } from "src/entities/User";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: String(process.env.DB_URL),
  logging: true,
  entities: [User, Tweet],
  migrations: [],
});
