"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUserDto = void 0;
class IUserDto {
    constructor(username) {
        this.username = username;
    }
    static from(user) {
        return new IUserDto(user.username);
    }
}
exports.IUserDto = IUserDto;
