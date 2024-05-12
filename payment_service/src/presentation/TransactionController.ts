import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionUseCase } from "../application/use-case/TransactionUseCase";
import {
	IDepositRequestDto,
	ISendRequestDto,
	ITransactionAccountDto,
	IWithdrawRequestDto,
} from "../domain/TransactionDto";
import { BadRequestError, NotFoundError } from "../shared/ErrorInstances";

export class TransactionController {
	public constructor(private readonly _useCase: TransactionUseCase) {}

	public async sendOut(
		req: FastifyRequest<{ Params: ITransactionAccountDto; Body: ISendRequestDto }>,
		res: FastifyReply
	): Promise<void> {
		try {
			const { amount, currency, recipient } = req.body;
			const { accountId } = req.params;
			const userId = req.user!.id;

			const result = await this._useCase.sendOut({
				accountId,
				amount,
				currency,
				recipient,
				userId,
			});

			res.status(200).send({ message: "success" });
		} catch (e) {
			if (e instanceof BadRequestError) res.status(400).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}

	public async send(
		req: FastifyRequest<{ Params: ITransactionAccountDto; Body: ISendRequestDto }>,
		res: FastifyReply
	): Promise<void> {
		try {
			const { amount, currency, recipient } = req.body;
			const { accountId } = req.params;
			const userId = req.user!.id;

			await this._useCase.send({
				accountId,
				amount,
				currency,
				recipient,
				userId,
			});

			res.status(200).send({ message: "success" });
		} catch (e) {
			if (e instanceof BadRequestError) res.status(400).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}

	public async withdraw(
		req: FastifyRequest<{ Params: ITransactionAccountDto; Body: IWithdrawRequestDto }>,
		res: FastifyReply
	): Promise<void> {
		try {
			const { amount, currency } = req.body;
			const { accountId } = req.params;
			const userId = req.user!.id;

			await this._useCase.withdraw({
				accountId,
				amount,
				currency,
				userId,
			});

			res.status(200).send({ message: "success" });
		} catch (e) {
			if (e instanceof BadRequestError) res.status(400).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}

	public async deposit(
		req: FastifyRequest<{ Params: ITransactionAccountDto; Body: IDepositRequestDto }>,
		res: FastifyReply
	): Promise<void> {
		try {
			const { amount, currency } = req.body;
			const { accountId } = req.params;
			const userId = req.user!.id;

			await this._useCase.deposit({
				accountId,
				amount,
				currency,
				userId,
			});

			res.status(200).send({ message: "success" });
		} catch (e) {
			if (e instanceof BadRequestError) res.status(400).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}

	public async find(req: FastifyRequest<{ Params: ITransactionAccountDto }>, res: FastifyReply): Promise<void> {
		try {
			const userId = req.user!.id;

			const result = await this._useCase.find({ accountId: req.params.accountId, userId });

			res.status(200).send({ data: result });
		} catch (e) {
			if (e instanceof NotFoundError) res.status(404).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}
}
