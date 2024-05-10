import { FastifyInstance, FastifyReply, FastifyRequest, fastify } from "fastify";
import pino from "pino";
import { IAuthenticateUserDto, ICreateUserDto, IGetUserDto } from "../entity/UserDto";
import { PrismaClient } from "@prisma/client";
import { UserUseCase } from "../application/use-case/UserUseCase";
import { UserController } from "./UserController";
import { PrismaUserRepository } from "../infrastructure/PrismaUserRepository";
import { AccountUseCase } from "../application/use-case/AccountUseCase";
import { AccountController } from "./AccountController";
import { PrismaAccountRepository } from "../infrastructure/PrismaAccountRepository";
import { ICreateAccountDto, IGetAccountDto } from "../entity/AccountDto";
import prisma from "../shared/prisma";
import { SupabaseClient } from "@supabase/supabase-js";
import supabase from "../shared/supabase";
import fastifyCookie from "@fastify/cookie";
import { AuthMiddleware } from "../application/middleware/AuthMiddleware";

export class Server {
	private readonly _prismaClient: PrismaClient;
	private readonly _supabaseClient: SupabaseClient;

	private readonly _prismaUserRepository: PrismaUserRepository;
	private readonly _userUseCase: UserUseCase;
	private readonly _userController: UserController;
	private readonly _prismaAccountRepository: PrismaAccountRepository;
	private readonly _accountUseCase: AccountUseCase;
	private readonly _accountController: AccountController;

	constructor() {
		this._prismaClient = prisma;
		this._supabaseClient = supabase;

		// user
		this._prismaUserRepository = new PrismaUserRepository(this._prismaClient, this._supabaseClient);
		this._userUseCase = new UserUseCase(this._prismaUserRepository);
		this._userController = new UserController(this._userUseCase);

		// account
		this._prismaAccountRepository = new PrismaAccountRepository(this._prismaClient);
		this._accountUseCase = new AccountUseCase(this._prismaAccountRepository, this._prismaUserRepository);
		this._accountController = new AccountController(this._accountUseCase);
	}

	public async run(port: number): Promise<void> {
		const app = fastify({
			logger: pino({ level: "info" }),
		});

		app.register(fastifyCookie);

		const publicRoutes = async (instance: FastifyInstance, _: any, next: (err?: Error | undefined) => void) => {
			instance.post("/user", (req: FastifyRequest<{ Body: ICreateUserDto }>, res: FastifyReply) =>
				this._userController.create(req, res)
			);

			instance.post("/auth", (req: FastifyRequest<{ Body: IAuthenticateUserDto }>, res: FastifyReply) =>
				this._userController.auth(req, res)
			);

			instance.post("/logout", (req: FastifyRequest<{ Body: IAuthenticateUserDto }>, res: FastifyReply) =>
				this._userController.logout(req, res)
			);

			next();
		};

		const privateRoutes = async (instance: FastifyInstance, _: any, next: (err?: Error | undefined) => void) => {
			instance.addHook("preHandler", AuthMiddleware(this._supabaseClient));

			instance.get("/user/:id", (req: FastifyRequest<{ Params: IGetUserDto }>, res: FastifyReply) =>
				this._userController.find(req, res)
			);

			instance.post("/account", (req: FastifyRequest<{ Body: ICreateAccountDto }>, res: FastifyReply) =>
				this._accountController.create(req, res)
			);

			instance.get("/account/:id", (req: FastifyRequest<{ Params: IGetAccountDto }>, res: FastifyReply) =>
				this._accountController.find(req, res)
			);

			next();
		};

		app.register(publicRoutes, { prefix: "account_manager" });
		app.register(privateRoutes, { prefix: "account_manager" });

		await app.listen({ port });
	}
}
