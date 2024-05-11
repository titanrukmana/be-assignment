import { PrismaClient } from "@prisma/client";
import { ITransactionRepository } from "../application/repository/TransactionRepository";
import { IDepositDto, ISendDto, IWithdrawDto } from "../domain/TransactionDto";

export class PrismaTransactionRepository implements ITransactionRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}

	public async send(input: ISendDto): Promise<void> {
		try {
			await this._prismaClient.$transaction(async (tx) => {
				const sender = await tx.paymentAccount.update({
					where: {
						id: input.account.id,
					},
					data: {
						balance: {
							decrement: (input.amount * input.currency.toUsd) / input.account.currency.toUsd,
						},
					},
				});

				if (sender.balance < 0) throw new Error("insufficient fund!");

				await tx.paymentHistory.create({
					data: {
						amount: input.amount,
						recipient: input.recipient,
						status: true,
						currency: {
							connect: { id: input.currency.id },
						},
						account: {
							connect: { id: input.account.id },
						},
					},
				});
			});
		} catch (e) {
			throw e;
		}
	}
	public async withdraw(input: IWithdrawDto): Promise<void> {
		try {
			await this._prismaClient.$transaction(async (tx) => {
				const sender = await tx.paymentAccount.update({
					where: {
						id: input.account.id,
					},
					data: {
						balance: {
							decrement: (input.amount * input.currency.toUsd) / input.account.currency.toUsd,
						},
					},
				});

				if (sender.balance < 0) throw new Error("insufficient fund!");

				await tx.paymentHistory.create({
					data: {
						amount: input.amount,
						recipient: "self",
						status: true,
						currency: {
							connect: { id: input.currency.id },
						},
						account: {
							connect: { id: input.account.id },
						},
					},
				});
			});
		} catch (e) {
			throw e;
		}
	}

	public async deposit(input: IDepositDto): Promise<void> {
		try {
			await this._prismaClient.$transaction(async (tx) => {
				const self = await tx.paymentAccount.update({
					where: {
						id: input.account.id,
					},
					data: {
						balance: {
							increment: (input.amount * input.currency.toUsd) / input.account.currency.toUsd,
						},
					},
				});

				if (self.balance < 0) throw new Error("insufficient fund!");

				await tx.paymentHistory.create({
					data: {
						amount: input.amount,
						recipient: "self",
						status: true,
						currency: {
							connect: { id: input.currency.id },
						},
						account: {
							connect: { id: input.account.id },
						},
					},
				});
			});
		} catch (e) {
			throw e;
		}
	}
}
