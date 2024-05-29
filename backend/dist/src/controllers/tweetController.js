"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweetRepository_1 = require("../repositories/tweetRepository");
class TweetController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                yield tweetRepository_1.tweetRepository.save(Object.assign(Object.assign({}, req.body), { author: user }));
                return res.status(201).json({
                    status: 201,
                    content: 'Tweet criado com sucesso!',
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco: ' + e.driverError,
                    success: false,
                });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({
                    status: 200,
                    content: yield tweetRepository_1.tweetRepository.find({
                        relations: { author: true, likes: true },
                        select: {
                            author: { id: true, firstName: true, lastName: true, email: true },
                            likes: { id: true },
                        },
                    }),
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco: ' + e.driverError,
                    success: false,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const tweetId = req.params.id;
                const tweet = yield tweetRepository_1.tweetRepository.findOne({
                    where: { id: tweetId },
                    relations: { author: true },
                });
                if (tweet === null)
                    return res.status(403).json({
                        status: 403,
                        content: 'Tweet inexistente',
                        success: false,
                    });
                if (user.id !== (tweet === null || tweet === void 0 ? void 0 : tweet.author.id))
                    return res.status(403).json({
                        status: 403,
                        content: 'Você não pode alterar tweet do outro usuário',
                        success: false,
                    });
                const updateTweetDTO = req.body;
                delete updateTweetDTO.user;
                yield tweetRepository_1.tweetRepository.update(tweetId, updateTweetDTO);
                return res.status(200).json({
                    status: 200,
                    content: 'Tweet atualizado com sucesso!',
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco: ' + e.driverError,
                    success: false,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const tweetId = req.params.id;
                const tweet = yield tweetRepository_1.tweetRepository.findOne({
                    where: { id: tweetId },
                    relations: { author: true },
                });
                if (tweet === null)
                    return res.status(403).json({
                        status: 403,
                        content: 'Tweet inexistente',
                        success: false,
                    });
                if (user.id !== (tweet === null || tweet === void 0 ? void 0 : tweet.author.id))
                    return res.status(403).json({
                        status: 403,
                        content: 'Você não pode apagar tweet do outro usuário',
                        success: false,
                    });
                yield tweetRepository_1.tweetRepository.delete(tweetId);
                return res.status(200).json({
                    status: 200,
                    content: 'Tweet deletado com sucesso!',
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco',
                    success: false,
                });
            }
        });
    }
    findAllFromAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const tweets = yield tweetRepository_1.tweetRepository.find({
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
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco',
                    success: false,
                });
            }
        });
    }
    likeOrDislike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                const tweetId = req.params.id;
                const tweet = yield tweetRepository_1.tweetRepository.findOne({
                    where: { id: tweetId },
                    relations: { author: true, likes: true },
                });
                if (tweet === null)
                    return res.status(403).json({
                        status: 403,
                        content: 'Tweet inexistente',
                        success: false,
                    });
                if (tweet.likes.some((t) => t.id === user.id))
                    tweet.likes.splice(tweet.likes.indexOf(user), 1);
                else
                    tweet.likes.unshift(user);
                yield tweetRepository_1.tweetRepository.save(tweet);
                return res.status(200).json({
                    status: 200,
                    content: 'Like ou deslike',
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco',
                    success: false,
                });
            }
        });
    }
}
exports.default = new TweetController();
