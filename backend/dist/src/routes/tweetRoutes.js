"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tweetController_1 = __importDefault(require("../controllers/tweetController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const createTweetValidations_1 = __importDefault(require("../middlewares/createTweetValidations"));
const router = (0, express_1.Router)();
router.post('/', createTweetValidations_1.default, loginRequired_1.default.validate, tweetController_1.default.create);
router.get('/', loginRequired_1.default.validate, tweetController_1.default.findAllFromAuthor);
router.get('/all', loginRequired_1.default.validate, tweetController_1.default.findAll);
router.put('/:id', createTweetValidations_1.default, loginRequired_1.default.validate, tweetController_1.default.update);
router.patch('/:id', loginRequired_1.default.validate, tweetController_1.default.likeOrDislike);
router.delete('/:id', loginRequired_1.default.validate, tweetController_1.default.delete);
exports.default = router;
