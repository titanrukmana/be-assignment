import {
	IDepositDto,
	IDepositRequestDto,
	ISendDto,
	ISendRequestDto,
	IWithdrawDto,
	IWithdrawRequestDto,
} from "../../domain/TransactionDto";
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

		if (!res) throw new Error("not found!");

		return res;
	}

	private async _getCurrency(code: string) {
		const res = await this._currencyRepo.find(code);

		if (!res) throw new Error("not found!");

		return res;
	}

	public async send(input: ISendRequestDto): Promise<void> {
		try {
			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: ISendDto = {
				account,
				amount: input.amount,
				currency,
				recipient: input.recipient,
				userId: input.userId,
			};

			this._transactionRepo.send(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async withdraw(input: IWithdrawRequestDto): Promise<void> {
		try {
			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: IWithdrawDto = {
				account,
				amount: input.amount,
				currency,
				userId: input.userId,
			};

			this._transactionRepo.withdraw(repoInput);
		} catch (e) {
			throw e;
		}
	}

	public async deposit(input: IDepositRequestDto): Promise<void> {
		try {
			const currency = await this._getCurrency(input.currency);
			const account = await this._getAccount(input.accountId, input.userId);

			const repoInput: IDepositDto = {
				account,
				amount: input.amount,
				currency,
				userId: input.userId,
			};

			this._transactionRepo.deposit(repoInput);
		} catch (e) {
			throw e;
		}
	}
}
