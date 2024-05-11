export interface ICreateAccountDto {
	type: string;
	userId: string;
	paymentId: string;
	balance: number;
	currency: string;
}

export interface IGetAccountDto {
	id: number;
	userId: string;
}
export interface IGetAllAccountDto {
	userId: string;
}

export interface ICreateAccountResultDto {
	id: number;
}
