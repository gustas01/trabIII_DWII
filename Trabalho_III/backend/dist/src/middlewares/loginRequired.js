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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
class LoginRequired {
    validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = LoginRequired.extractJWTFromCookies(req);
            if (!token)
                return res.status(401).json({
                    status: 401,
                    content: 'Você deve logar para acessar esse serviço',
                    success: false,
                });
            try {
                const { id } = jsonwebtoken_1.default.verify(token, String(process.env.TOKEN_SECRET));
                const user = yield userRepository_1.userRepository.findOne({
                    where: { id },
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                });
                if (!user) {
                    throw new Error('Usuário inválido');
                }
                req.body.user = user;
                return next();
            }
            catch (e) {
                return res.status(401).json({
                    status: 401,
                    content: 'Token expirado ou inválido',
                    success: false,
                });
            }
        });
    }
    static extractJWTFromCookies(req) {
        // if (req.cookies && "token" in req.cookies && req.cookies.token.length > 0)
        //   return req.cookies.token;
        // return null;
        var _a;
        if (req.headers.authorization) {
            const [, token] = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
            return token;
        }
        return null;
    }
}
exports.default = new LoginRequired();
