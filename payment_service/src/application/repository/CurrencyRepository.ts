import { Currency } from "../../domain/TransactionDto";

export interface ICurrencyRepository {
	save(currency: Currency): Promise<number>;
	find(code: string): Promise<Currency | null>;
	delete(id: number): Promise<boolean>;
	update(id: number, currency: Currency): Promise<Currency | null>;
}
