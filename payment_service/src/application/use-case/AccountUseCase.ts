import { ICreateAccountDto, ICreateAccountResultDto, IGetAccountDto, IGetAllAccountDto } from "../../domain/AccountDto";
import { Account } from "../../domain/TransactionDto";
import { BadRequestError, NotFoundError } from "../../shared/ErrorInstances";
import { IAccountRepository } from "../repository/AccountRepository";

export class AccountUseCase {
	public constructor(private readonly _accountRepo: IAccountRepository) {}

	public async create(input: ICreateAccountDto): Promise<ICreateAccountResultDto> {
		try {
			if (input.balance < 0) throw new BadRequestError("balance cannot be less than 0");
			const result = await this._accountRepo.save(input);

			return {
				id: result,
			};
		} catch (e) {
			throw e;
		}
	}

	public async find(input: IGetAccountDto): Promise<Account> {
		try {
			const account = await this._accountRepo.find(input.id, input.userId);
			if (!account) throw new NotFoundError("account not found");

			return account;
		} catch (e) {
			throw e;
		}
	}

	public async findAll(input: IGetAllAccountDto): Promise<Account[]> {
		try {
			const account = await this._accountRepo.findAll(input.userId);

			if (!account || account.length === 0) throw new NotFoundError("account not found");

			return account;
		} catch (e) {
			throw e;
		}
	}
}
