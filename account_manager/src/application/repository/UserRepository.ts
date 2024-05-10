import { User } from "../../domain/User";
import { IAuthenticateUserDto, IAuthenticateUserResultDto, ICreateUserDto } from "../../entity/UserDto";

export interface IUserRepository {
	auth(user: IAuthenticateUserDto): Promise<IAuthenticateUserResultDto>;
	logout(token: string): Promise<void>;
	save(user: ICreateUserDto): Promise<number>;
	find(id: number): Promise<User | null>;
}
