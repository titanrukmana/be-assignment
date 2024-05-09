import { User } from "../../domain/User";

export interface IUserRepository {
	save(user: User): Promise<number>;
	find(id: number): Promise<User | null>;
}
