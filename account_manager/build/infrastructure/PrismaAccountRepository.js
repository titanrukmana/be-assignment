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
exports.PrismaAccountRepository = void 0;
const Account_1 = require("../domain/Account");
class PrismaAccountRepository {
    constructor(_prismaClient) {
        this._prismaClient = _prismaClient;
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._prismaClient.paymentAccount.findFirst({
                where: {
                    id: Number(id),
                },
                select: {
                    id: true,
                    type: true,
                    user: {
                        select: {
                            username: true,
                            id: true,
                        },
                    },
                },
            });
            if (!result)
                return result;
            return new Account_1.Account(result.id, result.type, result.user);
        });
    }
    save(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._prismaClient.paymentAccount.create({
                data: {
                    type: account.type,
                    user: {
                        connect: { username: account.user.username },
                    },
                },
            });
            return result.id;
        });
    }
}
exports.PrismaAccountRepository = PrismaAccountRepository;
