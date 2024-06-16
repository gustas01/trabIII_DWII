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
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(401).json({
            status: 401,
            content: 'Todos os campos são obrigatórios!',
            success: false,
        });
    if (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /.{8,}/.test(password)))
        return res.status(400).json({
            status: 400,
            content: 'A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 minúscula',
            success: false,
        });
    return next();
});
