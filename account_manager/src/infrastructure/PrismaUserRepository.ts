import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../application/repository/UserRepository";
import { User } from "../domain/User";
import bcrypt from "bcrypt";
import { SupabaseClient } from "@supabase/supabase-js";
import { IAuthenticateUserDto, IAuthenticateUserResultDto, ICreateUserDto } from "../entity/UserDto";

export class PrismaUserRepository implements IUserRepository {
	public constructor(private readonly _prismaClient: PrismaClient, private readonly _supabaseClient: SupabaseClient) {}

	public async find(id: number): Promise<User | null> {
		const result = await this._prismaClient.user.findFirst({
			where: {
				id: Number(id),
			},
		});

		if (!result) return result;

		return new User(result.supabaseId, result.email, result.createdAt);
	}

	public async save(user: ICreateUserDto): Promise<number> {
		const { data, error } = await this._supabaseClient.auth.signUp({
			email: user.email,
			password: user.password,
		});

		if (error || !data.user || !data.user.email) throw new Error("supabase error");

		const result = await this._prismaClient.user.create({
			data: {
				supabaseId: data.user.id,
				email: data.user.email,
			},
		});

		return result.id;
	}

	public async auth(user: IAuthenticateUserDto): Promise<IAuthenticateUserResultDto> {
		const { data, error } = await this._supabaseClient.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		});

		if (error || !data.session) throw new Error("authentication failed!");

		return { email: user.email, accessToken: data.session.access_token, supabaseId: data.session.user.id };
	}

	public async logout(token: string): Promise<void> {
		await this._supabaseClient.auth.admin.signOut(token);
	}
}
