import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import cookies from "cookie-parser";

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import tweetRoutes from "./routes/tweetRoutes";
import { AppDataSource } from "./config/datasource";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

//rotas
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/tweet", tweetRoutes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server executando na porta ${process.env.SERVER_PORT}`)
    );
  })
  .catch((error) => console.log(error));
