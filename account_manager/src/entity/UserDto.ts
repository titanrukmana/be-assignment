import { User } from "../domain/User";

export class IUserDto {
	public constructor(public readonly email: string) {}
	public static from(user: User): IUserDto {
		return new IUserDto(user.email);
	}
}

export interface ICreateUserDto {
	email: string;
	password: string;
}

export interface IGetUserDto {
	id: number;
}

export interface ICreateUserResultDto {
	id: number;
}

export interface IUserPublicDto {
	id: string;
	email: string;
}

export interface IAuthenticateUserDto {
	email: string;
	password: string;
}

export interface IAuthenticateUserResultDto {
	email: string;
	supabaseId: string;
	accessToken: string;
}
