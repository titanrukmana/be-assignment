import { User } from "../../domain/User";
import {
	IAuthenticateUserDto,
	IAuthenticateUserResultDto,
	ICreateUserDto,
	ICreateUserResultDto,
	IGetUserDto,
	IUserDto,
} from "../../entity/UserDto";
import { IUserRepository } from "../repository/UserRepository";

export class UserUseCase {
	public constructor(private readonly _userRepo: IUserRepository) {}

	public async create(input: ICreateUserDto): Promise<ICreateUserResultDto> {
		const result = await this._userRepo.save(input);

		return {
			id: result,
		};
	}

	public async find(input: IGetUserDto): Promise<IUserDto> {
		const user = await this._userRepo.find(input.id);
		if (!user) throw new Error("not found!");

		return IUserDto.from(user);
	}

	public async auth(input: IAuthenticateUserDto): Promise<IAuthenticateUserResultDto> {
		const res = await this._userRepo.auth(input);

		if (!res) throw new Error("not found!");

		return res;
	}

	public async logout(token: string): Promise<void> {
		await this._userRepo.logout(token);
	}
}
