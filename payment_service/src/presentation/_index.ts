import { FastifyInstance, FastifyReply, FastifyRequest, fastify } from "fastify";
import pino from "pino";
import { PrismaClient } from "@prisma/client";
import { AccountUseCase } from "../application/use-case/AccountUseCase";
import { AccountController } from "./AccountController";
import { PrismaAccountRepository } from "../infrastructure/PrismaAccountRepository";
import { ICreateAccountDto, IGetAccountDto } from "../domain/AccountDto";
import prisma from "../shared/prisma";
import { SupabaseClient } from "@supabase/supabase-js";
import supabase from "../shared/supabase";
import fastifyCookie from "@fastify/cookie";
import { AuthMiddleware } from "../application/middleware/AuthMiddleware";
import { TransactionUseCase } from "../application/use-case/TransactionUseCase";
import { TransactionController } from "./TransactionController";
import { PrismaTransactionRepository } from "../infrastructure/PrismaTransactionRepository";
import {
	IDepositRequestDto,
	ISendRequestDto,
	ITransactionAccountDto,
	IWithdrawRequestDto,
} from "../domain/TransactionDto";
import { PrismaCurrencyRepository } from "../infrastructure/PrismaCurrencyRepository";

export class Server {
	private readonly _prismaClient: PrismaClient;
	private readonly _supabaseClient: SupabaseClient;

	private readonly _prismaAccountRepository: PrismaAccountRepository;
	private readonly _accountUseCase: AccountUseCase;
	private readonly _accountController: AccountController;

	private readonly _prismaTxRepository: PrismaTransactionRepository;
	private readonly _txUseCase: TransactionUseCase;
	private readonly _txController: TransactionController;

	private readonly _prismaCurrencyRepository: PrismaCurrencyRepository;

	constructor() {
		this._prismaClient = prisma;
		this._supabaseClient = supabase;

		// account
		this._prismaAccountRepository = new PrismaAccountRepository(this._prismaClient);
		this._accountUseCase = new AccountUseCase(this._prismaAccountRepository);
		this._accountController = new AccountController(this._accountUseCase);

		// currency
		this._prismaCurrencyRepository = new PrismaCurrencyRepository(this._prismaClient);

		// tx
		this._prismaTxRepository = new PrismaTransactionRepository(this._prismaClient);
		this._txUseCase = new TransactionUseCase(
			this._prismaTxRepository,
			this._prismaAccountRepository,
			this._prismaCurrencyRepository
		);
		this._txController = new TransactionController(this._txUseCase);
	}

	public async run(port: number): Promise<void> {
		const app = fastify({
			logger: pino({ level: "info" }),
		});

		app.register(fastifyCookie);

		const privateRoutes = async (instance: FastifyInstance, _: any, next: (err?: Error | undefined) => void) => {
			instance.addHook("preHandler", AuthMiddleware(this._supabaseClient));

			instance.get("/account", (req: FastifyRequest, res: FastifyReply) => this._accountController.findAll(req, res));

			instance.post("/account", (req: FastifyRequest<{ Body: ICreateAccountDto }>, res: FastifyReply) =>
				this._accountController.create(req, res)
			);

			instance.get("/account/:id", (req: FastifyRequest<{ Params: IGetAccountDto }>, res: FastifyReply) =>
				this._accountController.find(req, res)
			);

			instance.post(
				"/deposit/:accountId",
				(req: FastifyRequest<{ Params: ITransactionAccountDto; Body: IDepositRequestDto }>, res: FastifyReply) =>
					this._txController.deposit(req, res)
			);

			instance.post(
				"/send/:accountId",
				(req: FastifyRequest<{ Params: ITransactionAccountDto; Body: ISendRequestDto }>, res: FastifyReply) =>
					this._txController.send(req, res)
			);

			instance.post(
				"/send/out/:accountId",
				(req: FastifyRequest<{ Params: ITransactionAccountDto; Body: ISendRequestDto }>, res: FastifyReply) =>
					this._txController.sendOut(req, res)
			);

			instance.post(
				"/withdraw/:accountId",
				(req: FastifyRequest<{ Params: ITransactionAccountDto; Body: IWithdrawRequestDto }>, res: FastifyReply) =>
					this._txController.withdraw(req, res)
			);

			instance.get(
				"/history/:accountId",
				(req: FastifyRequest<{ Params: ITransactionAccountDto }>, res: FastifyReply) =>
					this._txController.find(req, res)
			);

			next();
		};

		app.register(privateRoutes, { prefix: "/payment" });

		await app.listen({ port, host: "0.0.0.0" });
	}
}
