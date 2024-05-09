import { Account } from "./Account";
import { User } from "./User";

export class PaymentHistory {
	public constructor(
		public readonly account: Account,
		public readonly user: User,
		public readonly amount: Number,
		public readonly recipient: string,
		public readonly status: boolean
	) {}
}
