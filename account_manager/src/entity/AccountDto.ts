import { User } from "../domain/User";

export interface ICreateAccountDto {
	type: string;
	userId: number;
	paymentId: string;
	balance: number;
}

export interface IGetAccountDto {
	id: number;
	userId: string;
}

export interface ICreateAccountResultDto {
	id: number;
}
