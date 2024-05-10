import { FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../application/use-case/UserUseCase";
import { IAuthenticateUserDto, ICreateUserDto, ICreateUserResultDto, IGetUserDto } from "../entity/UserDto";

export class CreatedUserDto implements ICreateUserResultDto {
	public readonly id: number;

	public constructor(id: number) {
		this.id = id;
	}
}

export class UserController {
	public constructor(private readonly _useCase: UserUseCase) {}

	public async create(req: FastifyRequest<{ Body: ICreateUserDto }>, res: FastifyReply): Promise<void> {
		const { email, password } = req.body;
		const result = await this._useCase.create({
			email,
			password,
		});

		const response = new CreatedUserDto(result.id);

		return res.send(response);
	}

	public async find(req: FastifyRequest<{ Params: IGetUserDto }>, res: FastifyReply): Promise<void> {
		const result = await this._useCase.find({
			id: req.params.id,
		});

		res.send(result);
	}

	public async auth(req: FastifyRequest<{ Body: IAuthenticateUserDto }>, res: FastifyReply): Promise<void> {
		const result = await this._useCase.auth(req.body);

		res
			.setCookie("accessToken", result.accessToken, {
				httpOnly: true,
				secure: true,
				maxAge: 60 ** 3,
			})
			.send(result);
	}

	public async logout(req: FastifyRequest, res: FastifyReply): Promise<void> {
		if (req.cookies.accessToken) await this._useCase.logout(req.cookies.accessToken);

		res
			.setCookie("accessToken", "", {
				httpOnly: true,
				secure: true,
				maxAge: -1,
			})
			.send(true);
	}
}
