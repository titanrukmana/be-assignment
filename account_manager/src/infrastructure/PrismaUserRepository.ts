import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../application/repository/UserRepository";
import { User } from "../domain/User";

export class PrismaUserRepository implements IUserRepository {
	public constructor(private readonly _prismaClient: PrismaClient) {}

	public async find(id: number): Promise<User | null> {
		const result = await this._prismaClient.user.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!result) return result;

		return new User(result.id, result.username, result.password, result.createdAt);
	}

	public async save(user: User): Promise<number> {
		const result = await this._prismaClient.user.create({
			data: {
				username: user.username,
				password: user.password,
			},
		});

		return result.id;
	}
}
