"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const Tweet_1 = require("../entities/Tweet");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
require("reflect-metadata");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: String(process.env.DB_URL),
    synchronize: true,
    // logging: true,
    entities: [User_1.User, Tweet_1.Tweet],
    migrations: [],
});
