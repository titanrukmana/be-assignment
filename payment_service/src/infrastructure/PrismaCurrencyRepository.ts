import { PrismaClient } from "@prisma/client";
import { ICurrencyRepository } from "../application/repository/CurrencyRepository";
import { Currency } from "../domain/TransactionDto";

export class PrismaCurrencyRepository implements ICurrencyRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}

	public async save(currency: Currency): Promise<number> {
		try {
			const curr = await this._prismaClient.currency.create({
				data: {
					code: currency.code,
					toUsd: currency.toUsd,
				},
			});

			return curr.id;
		} catch (e) {
			throw e;
		}
	}
	public async find(code: string): Promise<Currency | null> {
		try {
			const curr = await this._prismaClient.currency.findFirst({
				where: {
					code,
				},
			});

			return curr;
		} catch (e) {
			throw e;
		}
	}
	public async delete(id: number): Promise<boolean> {
		try {
			const result = await this._prismaClient.currency.delete({
				where: {
					id,
				},
			});

			return !!result;
		} catch (e) {
			throw e;
		}
	}
	public async update(id: number, currency: Currency): Promise<Currency | null> {
		try {
			const result = await this._prismaClient.currency.update({
				where: {
					id,
				},
				data: {
					...(currency.code && { code: currency.code }),
					...(currency.toUsd && { type: currency.toUsd }),
				},
				select: {
					id: true,
					code: true,
					toUsd: true,
				},
			});

			if (!result) return result;

			return new Currency(result.id, result.code, result.toUsd);
		} catch (e) {
			throw e;
		}
	}
}
