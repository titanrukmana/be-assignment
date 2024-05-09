import { Account } from "../domain/Account";

export interface ICreateAccountDto {
	type: string;
	userId: number;
}

export interface IGetAccountDto {
	id: number;
}

export interface ICreateAccountResultDto {
	id: number;
}
