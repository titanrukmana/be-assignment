import { Account } from "./TransactionDto";

export class PaymentHistory {
	public constructor(
		public readonly account: Account,
		public readonly amount: Number,
		public readonly recipient: string,
		public readonly status: boolean
	) {}
}
