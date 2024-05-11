export class Account {
	public constructor(
		public readonly id: number,
		public readonly type: string,
		public readonly paymentIdentifier: string,
		public readonly balance: number,
		public readonly currency: Currency,
		public readonly userId: string
	) {}
}

export class Currency {
	public constructor(public readonly id: number, public readonly code: string, public readonly toUsd: number) {}
}

export interface ISendRequestDto {
	accountId: number;
	amount: number;
	recipient: string;
	userId: string;
	currency: string;
}

export interface IWithdrawRequestDto {
	accountId: number;
	amount: number;
	userId: string;
	currency: string;
}

export interface IDepositRequestDto {
	accountId: number;
	amount: number;
	currency: string;
	userId: string;
}

export interface ISendDto {
	account: Account;
	amount: number;
	recipient: string;
	userId: string;
	currency: Currency;
}

export interface IWithdrawDto {
	account: Account;
	amount: number;
	userId: string;
	currency: Currency;
}

export interface IDepositDto {
	account: Account;
	amount: number;
	currency: Currency;
	userId: string;
}
