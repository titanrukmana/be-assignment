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
exports.Server = void 0;
const fastify_1 = require("fastify");
const pino_1 = __importDefault(require("pino"));
const client_1 = require("@prisma/client");
const UserUseCase_1 = require("../application/use-case/UserUseCase");
const UserController_1 = require("./UserController");
const PrismaUserRepository_1 = require("../infrastructure/PrismaUserRepository");
const AccountUseCase_1 = require("../application/use-case/AccountUseCase");
const AccountController_1 = require("./AccountController");
const PrismaAccountRepository_1 = require("../infrastructure/PrismaAccountRepository");
class Server {
    constructor() {
        this._prismaClient = new client_1.PrismaClient();
        // user
        this._prismaUserRepository = new PrismaUserRepository_1.PrismaUserRepository(this._prismaClient);
        this._userUseCase = new UserUseCase_1.UserUseCase(this._prismaUserRepository);
        this._userController = new UserController_1.UserController(this._userUseCase);
        // account
        this._prismaAccountRepository = new PrismaAccountRepository_1.PrismaAccountRepository(this._prismaClient);
        this._accountUseCase = new AccountUseCase_1.AccountUseCase(this._prismaAccountRepository, this._prismaUserRepository);
        this._accountController = new AccountController_1.AccountController(this._accountUseCase);
    }
    run(port) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = (0, fastify_1.fastify)({
                logger: (0, pino_1.default)({ level: "info" }),
            });
            app.register((instance, _, next) => {
                instance.post("/user", (req, res) => this._userController.create(req, res));
                instance.get("/user/:id", (req, res) => this._userController.find(req, res));
                instance.post("/account", (req, res) => this._accountController.create(req, res));
                instance.get("/account/:id", (req, res) => this._accountController.find(req, res));
                next();
            }, { prefix: "account_manager" });
            yield app.listen({ port });
        });
    }
}
exports.Server = Server;
