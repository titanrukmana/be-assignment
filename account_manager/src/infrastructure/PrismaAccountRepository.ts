import { PrismaClient } from "@prisma/client";
import { IAccountRepository } from "../application/repository/AccountRepository";
import { Account } from "../domain/Account";

export class PrismaAccountRepository implements IAccountRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}

	public async find(id: number): Promise<Account | null> {
		const result = await this._prismaClient.paymentAccount.findFirst({
			where: {
				id: Number(id),
			},
			select: {
				id: true,
				type: true,
				user: {
					select: {
						username: true,
						id: true,
					},
				},
			},
		});

		if (!result) return result;
		return new Account(result.id, result.type, result.user);
	}

	public async save(account: Account): Promise<number> {
		const result = await this._prismaClient.paymentAccount.create({
			data: {
				type: account.type,
				user: {
					connect: { username: account.user.username },
				},
			},
		});

		return result.id;
	}
}
