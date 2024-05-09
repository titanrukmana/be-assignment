import { Account } from "../../domain/Account";
import { ICreateAccountDto, ICreateAccountResultDto, IGetAccountDto } from "../../entity/AccountDto";
import { PrismaUserRepository } from "../../infrastructure/PrismaUserRepository";
import { IAccountRepository } from "../repository/AccountRepository";

export class AccountUseCase {
	public constructor(
		private readonly _accountRepo: IAccountRepository,
		private readonly _userRepo: PrismaUserRepository
	) {}

	public async create(input: ICreateAccountDto): Promise<ICreateAccountResultDto> {
		const user = await this._userRepo.find(input.userId);

		if (!user) throw new Error("user not found!");

		const account = new Account(1, input.type, user);

		const result = await this._accountRepo.save(account);

		return {
			id: result,
		};
	}

	public async find(input: IGetAccountDto): Promise<Account> {
		const account = await this._accountRepo.find(input.id);
		if (!account) throw new Error("not found!");

		return account;
	}
}
