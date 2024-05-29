"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const createUserValidations_1 = __importDefault(require("../middlewares/createUserValidations"));
const loginUserValidations_1 = __importDefault(require("../middlewares/loginUserValidations"));
const router = (0, express_1.Router)();
router.post("/register", createUserValidations_1.default, authController_1.default.register);
router.post("/login", loginUserValidations_1.default, authController_1.default.login);
router.post("/logout", authController_1.default.logout);
exports.default = router;
