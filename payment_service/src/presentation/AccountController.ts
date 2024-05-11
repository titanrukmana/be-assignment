import { FastifyReply, FastifyRequest } from "fastify";
import { AccountUseCase } from "../application/use-case/AccountUseCase";
import { ICreateAccountDto, ICreateAccountResultDto, IGetAccountDto, IGetAllAccountDto } from "../domain/AccountDto";

export class CreatedAccountDto implements ICreateAccountResultDto {
	public readonly id: number;

	public constructor(id: number) {
		this.id = id;
	}
}

export class AccountController {
	public constructor(private readonly _useCase: AccountUseCase) {}

	public async create(req: FastifyRequest<{ Body: ICreateAccountDto }>, res: FastifyReply): Promise<void> {
		const { type, paymentId, balance, currency } = req.body;
		const userId = req.user!.id;

		const result = await this._useCase.create({
			type,
			userId,
			paymentId,
			balance,
			currency,
		});

		const response = new CreatedAccountDto(result.id);

		return res.send(response);
	}

	public async find(req: FastifyRequest<{ Params: IGetAccountDto }>, res: FastifyReply): Promise<void> {
		const userId = req.user!.id;

		const result = await this._useCase.find({
			id: req.params.id,
			userId,
		});

		res.send(result);
	}

	public async findAll(req: FastifyRequest, res: FastifyReply): Promise<void> {
		const userId = req.user!.id;

		const result = await this._useCase.findAll({
			userId,
		});

		res.send(result);
	}
}
