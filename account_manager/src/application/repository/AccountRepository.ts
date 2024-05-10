import { Account } from "../../domain/Account";
import { User } from "../../domain/User";

export interface IAccountRepository {
	save(account: Account): Promise<number>;
	find(id: number, userId: string): Promise<Account | null>;
	delete(id: number): Promise<boolean>;
	update(id: number, account: Account): Promise<Account | null>;
}
