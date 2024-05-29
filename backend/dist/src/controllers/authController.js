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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRepository_1 = require("../repositories/userRepository");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                user.password = yield bcryptjs_1.default.hash(user.password, yield bcryptjs_1.default.genSalt(8));
                yield userRepository_1.userRepository.save(user);
                return res.status(201).json({
                    status: 201,
                    content: 'Usuário criado com sucesso!',
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco: ' + e.errors,
                    success: true,
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const login = req.body;
                const user = yield userRepository_1.userRepository.findOne({
                    where: { email: login.email },
                });
                const password = String(user === null || user === void 0 ? void 0 : user.password);
                const id = String(user === null || user === void 0 ? void 0 : user.id);
                if (!user || !(yield bcryptjs_1.default.compare(login.password, password)))
                    return res.status(401).json({
                        status: 401,
                        content: 'Usuário ou senha inválidos',
                        success: false,
                    });
                const token = (0, jsonwebtoken_1.sign)({ id }, String(process.env.TOKEN_SECRET), {
                    expiresIn: '2h',
                });
                // res.cookie('token', token, {
                //   httpOnly: true,
                //   path: '/',
                //   secure: true,
                //   sameSite: 'none',
                // });
                return res.status(200).json({
                    status: 200,
                    content: { token },
                    success: true,
                });
            }
            catch (e) {
                return res.status(400).json({
                    status: 400,
                    content: 'Falha no banco: ',
                    success: false,
                });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // res.cookie('token', '', {
            //   httpOnly: true,
            //   path: '/',
            //   secure: true,
            //   sameSite: 'none',
            //   maxAge: 0,
            // });
            req.body.user = undefined;
            return res.status(200).json({
                status: 200,
                content: 'Logout feito com sucesso!',
                success: true,
            });
        });
    }
}
exports.default = new AuthController();
