import { ICreateAccountDto } from "../../domain/AccountDto";
import { Account } from "../../domain/TransactionDto";

export interface IAccountRepository {
	save(account: ICreateAccountDto): Promise<number>;
	find(id: number, userId: string): Promise<Account>;
	findAll(userId: string): Promise<Account[]>;
	delete(id: number): Promise<boolean>;
	update(id: number, account: Account): Promise<Account>;
}
