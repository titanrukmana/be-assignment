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
exports.UserUseCase = void 0;
const User_1 = require("../../domain/User");
const UserDto_1 = require("../../entity/UserDto");
class UserUseCase {
    constructor(_userRepo) {
        this._userRepo = _userRepo;
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User_1.User(1, input.username, input.password, new Date());
            const result = yield this._userRepo.save(user);
            return {
                id: result,
            };
        });
    }
    find(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._userRepo.find(input.id);
            if (!user)
                throw new Error("not found!");
            return UserDto_1.IUserDto.from(user);
        });
    }
}
exports.UserUseCase = UserUseCase;
