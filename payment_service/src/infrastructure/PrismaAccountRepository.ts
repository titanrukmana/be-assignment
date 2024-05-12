import { PrismaClient } from "@prisma/client";
import { IAccountRepository } from "../application/repository/AccountRepository";
import { ICreateAccountDto } from "../domain/AccountDto";
import { Account } from "../domain/TransactionDto";
import {
	PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { BadRequestError, NotFoundError } from "../shared/ErrorInstances";

export class PrismaAccountRepository implements IAccountRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}
	public async find(id: number, userId: string): Promise<Account> {
		try {
			const result = await this._prismaClient.paymentAccount.findFirst({
				where: {
					id: Number(id),
					userId,
				},
				select: {
					id: true,
					type: true,
					paymentIdentifier: true,
					balance: true,
					currency: true,
				},
			});

			if (!result) throw new Error("account not found");

			return result as Account;
		} catch (e) {
			throw e;
		}
	}

	public async save(account: ICreateAccountDto): Promise<number> {
		try {
			const currency = await this._prismaClient.currency.findFirst({
				where: {
					code: account.currency,
				},
			});

			if (!currency) throw new NotFoundError("currency not found");

			const result = await this._prismaClient.paymentAccount.create({
				data: {
					type: account.type,
					paymentIdentifier: account.paymentId,
					balance: account.balance,
					currency: {
						connect: { code: currency.code },
					},
					userId: account.userId,
				},
			});

			return result.id;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					e = new BadRequestError("payment id exists");
				}
			}
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

	public async delete(id: number): Promise<boolean> {
		try {
			const result = await this._prismaClient.paymentAccount.delete({
				where: {
					id,
				},
			});

			return !!result;
		} catch (e) {
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

	public async update(id: number, account: Account): Promise<Account> {
		try {
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
					currency: true,
				},
			});

			if (!result) throw new NotFoundError("account not found");

			return result as Account;
		} catch (e) {
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

	public async findAll(userId: string): Promise<Account[]> {
		try {
			const res = await this._prismaClient.paymentAccount.findMany({
				where: {
					userId,
				},
				select: {
					id: true,
					balance: true,
					paymentIdentifier: true,
					type: true,
					currency: true,
				},
			});

			return res as Account[];
		} catch (e) {
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}
}
