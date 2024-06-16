"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRepository = void 0;
const datasource_1 = require("../config/datasource");
const Tweet_1 = require("../entities/Tweet");
exports.tweetRepository = datasource_1.AppDataSource.getRepository(Tweet_1.Tweet);
