import { User } from "../domain/User";

export class IUserDto {
	public constructor(public readonly username: string) {}
	public static from(user: User): IUserDto {
		return new IUserDto(user.username);
	}
}

export interface ICreateUserDto {
	username: string;
	password: string;
}

export interface IGetUserDto {
	id: number;
}

export interface ICreateUserResultDto {
	id: number;
}

export interface IUserPublicDto {
	id: number;
	username: string;
}

export interface IAuthenticateUserResultDto {}
