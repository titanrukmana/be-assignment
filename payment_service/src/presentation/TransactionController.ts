import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionUseCase } from "../application/use-case/TransactionUseCase";
import { IDepositRequestDto, ISendRequestDto, IWithdrawRequestDto } from "../domain/TransactionDto";

export class TransactionController {
	public constructor(private readonly _useCase: TransactionUseCase) {}

	public async send(req: FastifyRequest<{ Body: ISendRequestDto }>, res: FastifyReply): Promise<void> {
		const { accountId, amount, currency, recipient } = req.body;
		const userId = req.user!.id;

		const result = await this._useCase.send({
			accountId,
			amount,
			currency,
			recipient,
			userId,
		});

		return res.send(result);
	}

	public async withdraw(req: FastifyRequest<{ Body: IWithdrawRequestDto }>, res: FastifyReply): Promise<void> {
		const { accountId, amount, currency } = req.body;
		const userId = req.user!.id;

		const result = await this._useCase.withdraw({
			accountId,
			amount,
			currency,
			userId,
		});

		res.send(result);
	}

	public async deposit(req: FastifyRequest<{ Body: IDepositRequestDto }>, res: FastifyReply): Promise<void> {
		const { accountId, amount, currency } = req.body;
		const userId = req.user!.id;

		const result = await this._useCase.deposit({
			accountId,
			amount,
			currency,
			userId,
		});

		res.send(result);
	}
}
