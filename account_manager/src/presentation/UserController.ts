import { FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../application/use-case/UserUseCase";
import { ICreateUserDto, ICreateUserResultDto, IGetUserDto } from "../entity/UserDto";

export class CreatedUserDto implements ICreateUserResultDto {
	public readonly id: number;

	public constructor(id: number) {
		this.id = id;
	}
}

export class UserController {
	public constructor(private readonly _useCase: UserUseCase) {}

	public async create(req: FastifyRequest<{ Body: ICreateUserDto }>, res: FastifyReply): Promise<void> {
		const { username, password } = req.body;
		const result = await this._useCase.create({
			username,
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
}
