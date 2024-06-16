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
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    me(req, res) {
        return res.status(200).json({
            status: 200,
            content: req.body.user,
            success: true,
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body.user;
            const updateUserDTO = req.body;
            delete updateUserDTO.user;
            yield userRepository_1.userRepository.update(id, req.body);
            return res.status(200).json({
                status: 200,
                content: 'Usuário atualizado com sucesso!',
                success: true,
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body.user;
            yield userRepository_1.userRepository.delete(id);
            return res.status(200).json({
                status: 200,
                content: 'Usuário apagado com sucesso!',
                success: true,
            });
        });
    }
}
exports.default = new UserController();
