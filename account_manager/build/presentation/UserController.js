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
exports.UserController = exports.CreatedUserDto = void 0;
class CreatedUserDto {
    constructor(id) {
        this.id = id;
    }
}
exports.CreatedUserDto = CreatedUserDto;
class UserController {
    constructor(_useCase) {
        this._useCase = _useCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const result = yield this._useCase.create({
                username,
                password,
            });
            const response = new CreatedUserDto(result.id);
            return res.send(response);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._useCase.find({
                id: req.params.id,
            });
            res.send(result);
        });
    }
}
exports.UserController = UserController;
