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

export interface ISendInputDto {
	accountId: number;
	amount: number;
	recipient: string;
	userId: string;
	currency: string;
}

export interface IWithdrawInputDto {
	accountId: number;
	amount: number;
	userId: string;
	currency: string;
}

export interface IDepositInputDto {
	accountId: number;
	amount: number;
	userId: string;
	currency: string;
}

export interface ISendRequestDto {
	amount: number;
	recipient: string;
	userId: string;
	currency: string;
}

export interface IWithdrawRequestDto {
	amount: number;
	userId: string;
	currency: string;
}

export interface IDepositRequestDto {
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

export interface ITransactionAccountDto {
	accountId: number;
}

export interface IHistoryDto {
	accountId: number;
	userId: string;
}
