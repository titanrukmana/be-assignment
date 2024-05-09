import { User } from "../../domain/User";
import { ICreateUserDto, ICreateUserResultDto, IGetUserDto, IUserDto } from "../../entity/UserDto";
import { IUserRepository } from "../repository/UserRepository";

export class UserUseCase {
	public constructor(private readonly _userRepo: IUserRepository) {}

	public async create(input: ICreateUserDto): Promise<ICreateUserResultDto> {
		const user = new User(1, input.username, input.password, new Date());

		const result = await this._userRepo.save(user);

		return {
			id: result,
		};
	}

	public async find(input: IGetUserDto): Promise<IUserDto> {
		const user = await this._userRepo.find(input.id);
		if (!user) throw new Error("not found!");

		return IUserDto.from(user);
	}
}
