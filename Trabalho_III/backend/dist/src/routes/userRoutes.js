"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const loginRequired_1 = __importDefault(require("../middlewares/loginRequired"));
const router = (0, express_1.Router)();
router.get('/me', loginRequired_1.default.validate, userController_1.default.me);
router.put('/', loginRequired_1.default.validate, userController_1.default.update);
router.delete('/', loginRequired_1.default.validate, userController_1.default.delete);
exports.default = router;
