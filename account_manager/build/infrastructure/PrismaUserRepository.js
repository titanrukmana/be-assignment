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
exports.PrismaUserRepository = void 0;
const User_1 = require("../domain/User");
class PrismaUserRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._prismaClient.user.findFirst({
                where: {
                    id: Number(id),
                },
            });
            if (!result)
                return result;
            return new User_1.User(result.id, result.username, result.password, result.createdAt);
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._prismaClient.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                },
            });
            return result.id;
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
