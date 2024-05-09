import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../application/repository/UserRepository";
import { User } from "../domain/User";
import bcrypt from "bcrypt";

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
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.password, salt);

		const result = await this._prismaClient.user.create({
			data: {
				username: user.username,
				password: hashedPassword,
			},
		});

		return result.id;
	}
}
