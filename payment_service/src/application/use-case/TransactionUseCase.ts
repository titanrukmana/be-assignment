import { PaymentHistory } from "../../domain/HistoryDto";
import {
	IDepositDto,
	IDepositInputDto,
	IHistoryDto,
	ISendDto,
	ISendInputDto,
	IWithdrawDto,
	IWithdrawInputDto,
} from "../../domain/TransactionDto";
import { BadRequestError } from "../../shared/ErrorInstances";
import { IAccountRepository } from "../repository/AccountRepository";
import { ICurrencyRepository } from "../repository/CurrencyRepository";
import { ITransactionRepository } from "../repository/TransactionRepository";

export class TransactionUseCase {
	public constructor(
		private readonly _transactionRepo: ITransactionRepository,
		private readonly _accountRepo: IAccountRepository,
		private readonly _currencyRepo: ICurrencyRepository
	) {}

	private async _getAccount(id: number, userId: string) {
		const res = await this._accountRepo.find(id, userId);

		if (!res) throw new Error("account not found");

		return res;
	}

	private async _getCurrency(code: string) {
		const res = await this._currencyRepo.find(code);

		if (!res) throw new Error("currency not found");

		return res;
	}

	public async sendOut(input: ISendInputDto): Promise<void> {
		try {
			if (!input.amount || input.amount < 0) throw new BadRequestError("amount must be greater than zero");
			if (!input.currency) throw new BadRequestError("currency must be filled");
			if (!input.recipient) throw new BadRequestError("recipient must be filled");

			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: ISendDto = {
				account,
				amount: input.amount,
				currency,
				recipient: input.recipient,
				userId: input.userId,
			};

			await this._transactionRepo.sendOut(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async send(input: ISendInputDto): Promise<void> {
		try {
			if (!input.amount || input.amount < 0) throw new BadRequestError("amount must be greater than zero");
			if (!input.currency) throw new BadRequestError("currency must be filled");
			if (!input.recipient) throw new BadRequestError("recipient must be filled");

			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: ISendDto = {
				account,
				amount: input.amount,
				currency,
				recipient: input.recipient,
				userId: input.userId,
			};

			await this._transactionRepo.send(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async withdraw(input: IWithdrawInputDto): Promise<void> {
		try {
			if (!input.amount || input.amount < 0) throw new BadRequestError("amount must be greater than zero");
			if (!input.currency) throw new BadRequestError("currency must be filled");

			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: IWithdrawDto = {
				account,
				amount: input.amount,
				currency,
				userId: input.userId,
			};

			await this._transactionRepo.withdraw(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async deposit(input: IDepositInputDto): Promise<void> {
		try {
			if (!input.amount || input.amount < 0) throw new BadRequestError("amount must be greater than zero");
			if (!input.currency) throw new BadRequestError("currency must be filled");

			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: IDepositDto = {
				account,
				amount: input.amount,
				currency,
				userId: input.userId,
			};

			await this._transactionRepo.deposit(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async find(input: IHistoryDto): Promise<PaymentHistory[]> {
		try {
			const history = await this._transactionRepo.find(input);

			return history;
		} catch (e) {
			throw e;
		}
	}
}
