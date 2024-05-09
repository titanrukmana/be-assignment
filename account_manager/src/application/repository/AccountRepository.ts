import { Account } from "../../domain/Account";

export interface IAccountRepository {
	save(account: Account): Promise<number>;
	find(id: number): Promise<Account | null>;
}
