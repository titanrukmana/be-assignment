import { PrismaClient } from "@prisma/client";
import { IAccountRepository } from "../application/repository/AccountRepository";
import { Account } from "../domain/Account";
import { User } from "../domain/User";

export class PrismaAccountRepository implements IAccountRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}
	public async find(id: number, userId: string): Promise<Account | null> {
		const result = await this._prismaClient.paymentAccount.findFirst({
			where: {
				id: Number(id),
				user: {
					supabaseId: userId,
				},
			},
			select: {
				id: true,
				type: true,
				paymentIdentifier: true,
				balance: true,
				user: {
					select: {
						email: true,
						supabaseId: true,
					},
				},
			},
		});

		console.log(result);

		if (!result) return result;
		return new Account(result.id, result.type, result.paymentIdentifier, result.balance, {
			id: result.user.supabaseId,
			email: result.user.email,
		});
	}

	public async save(account: Account): Promise<number> {
		const result = await this._prismaClient.paymentAccount.create({
			data: {
				type: account.type,
				paymentIdentifier: account.paymentIdentifier,
				balance: account.balance,
				user: {
					connect: { email: account.user.email },
				},
			},
		});

		return result.id;
	}

	public async delete(id: number): Promise<boolean> {
		const result = await this._prismaClient.paymentAccount.delete({
			where: {
				id,
			},
		});

		return !!result;
	}

	public async update(id: number, account: Account): Promise<Account | null> {
		const result = await this._prismaClient.paymentAccount.update({
			where: {
				id,
			},
			data: {
				...(account.type && { type: account.type }),
				...(account.paymentIdentifier && { type: account.paymentIdentifier }),
			},
			select: {
				id: true,
				type: true,
				paymentIdentifier: true,
				balance: true,
				user: {
					select: {
						email: true,
						supabaseId: true,
					},
				},
			},
		});

		if (!result) return result;

		return new Account(result.id, result.type, result.paymentIdentifier, result.balance, {
			id: result.user.supabaseId,
			email: result.user.email,
		});
	}
}
