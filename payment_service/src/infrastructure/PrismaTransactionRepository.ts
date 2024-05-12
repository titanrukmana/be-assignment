import { PrismaClient } from "@prisma/client";
import { ITransactionRepository } from "../application/repository/TransactionRepository";
import { IDepositDto, IHistoryDto, ISendDto, ITransactionAccountDto, IWithdrawDto } from "../domain/TransactionDto";
import { PaymentHistory } from "../domain/HistoryDto";
import { BadRequestError, NotFoundError } from "../shared/ErrorInstances";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export class PrismaTransactionRepository implements ITransactionRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}

	public async sendOut(input: ISendDto): Promise<void> {
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

				if (sender.balance < 0) throw new Error("insufficient funds");

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
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

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

				if (sender.balance < 0) throw new Error("insufficient funds");

				const recipient = await tx.paymentAccount.findFirst({
					where: {
						paymentIdentifier: input.recipient,
					},
				});

				if (!recipient) throw new BadRequestError("recipient not found");

				await tx.paymentAccount.update({
					where: {
						id: recipient.id,
					},
					data: {
						balance: {
							increment: (input.amount * input.currency.toUsd) / input.account.currency.toUsd,
						},
					},
				});

				await tx.paymentHistory.create({
					data: {
						amount: input.amount,
						recipient: recipient.paymentIdentifier,
						status: true,
						currency: {
							connect: { id: input.currency.id },
						},
						account: {
							connect: { id: input.account.id },
						},
					},
				});

				await tx.paymentHistory.create({
					data: {
						amount: -1 * input.amount,
						recipient: input.account.paymentIdentifier,
						status: true,
						currency: {
							connect: { id: input.currency.id },
						},
						account: {
							connect: { id: recipient.id },
						},
					},
				});
			});
		} catch (e) {
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
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

				if (sender.balance < 0) throw new Error("insufficient funds");

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
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

	public async deposit(input: IDepositDto): Promise<void> {
		try {
			await this._prismaClient.$transaction(async (tx) => {
				await tx.paymentAccount.update({
					where: {
						id: input.account.id,
					},
					data: {
						balance: {
							increment: (input.amount * input.currency.toUsd) / input.account.currency.toUsd,
						},
					},
				});

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
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}

	public async find(input: IHistoryDto): Promise<PaymentHistory[]> {
		try {
			const res = await this._prismaClient.paymentHistory.findMany({
				where: {
					account: {
						id: Number(input.accountId),
						userId: input.userId,
					},
				},
				select: {
					id: true,
					amount: true,
					currency: true,
					createdAt: true,
					status: true,
					recipient: true,
					paymentAccountId: true,
				},
			});

			if (!res || res.length === 0) throw new NotFoundError("history not found");

			return res as PaymentHistory[];
		} catch (e) {
			if (e instanceof PrismaClientValidationError) {
				e = new BadRequestError("field incomplete");
			}
			throw e;
		}
	}
}
