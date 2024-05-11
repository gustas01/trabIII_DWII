import { AppDataSource } from "src/config/datasource";
import { User } from "src/entities/User";

export const userRepository = AppDataSource.getRepository(User);
