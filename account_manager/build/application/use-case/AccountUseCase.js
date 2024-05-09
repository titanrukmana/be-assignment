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
exports.AccountUseCase = void 0;
const Account_1 = require("../../domain/Account");
class AccountUseCase {
    constructor(_accountRepo, _userRepo) {
        this._accountRepo = _accountRepo;
        this._userRepo = _userRepo;
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userRepo.find(input.userId);
            if (!user)
                throw new Error("user not found!");
            const account = new Account_1.Account(1, input.type, user);
            const result = yield this._accountRepo.save(account);
            return {
                id: result,
            };
        });
    }
    find(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this._accountRepo.find(input.id);
            if (!account)
                throw new Error("not found!");
            return account;
        });
    }
}
exports.AccountUseCase = AccountUseCase;
