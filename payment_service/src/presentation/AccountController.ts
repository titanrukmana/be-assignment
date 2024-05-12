import { FastifyReply, FastifyRequest } from "fastify";
import { AccountUseCase } from "../application/use-case/AccountUseCase";
import { ICreateAccountDto, ICreateAccountResultDto, IGetAccountDto, IGetAllAccountDto } from "../domain/AccountDto";
import { BadRequestError, NotFoundError } from "../shared/ErrorInstances";

export class CreatedAccountDto implements ICreateAccountResultDto {
	public readonly id: number;

	public constructor(id: number) {
		this.id = id;
	}
}

export class AccountController {
	public constructor(private readonly _useCase: AccountUseCase) {}

	public async create(req: FastifyRequest<{ Body: ICreateAccountDto }>, res: FastifyReply): Promise<void> {
		try {
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

			return res.status(201).send({ data: response });
		} catch (e) {
			if (e instanceof NotFoundError) return res.status(404).send({ message: e.message });
			else if (e instanceof BadRequestError) return res.status(400).send({ message: e.message });
			else if (e instanceof Error) return res.status(500).send({ message: e.message });
		}
	}

	public async find(req: FastifyRequest<{ Params: IGetAccountDto }>, res: FastifyReply): Promise<void> {
		try {
			const userId = req.user!.id;

			const result = await this._useCase.find({
				id: req.params.id,
				userId,
			});

			res.status(200).send({ data: result });
		} catch (e) {
			if (e instanceof NotFoundError) return res.status(404).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}

	public async findAll(req: FastifyRequest, res: FastifyReply): Promise<void> {
		try {
			const userId = req.user!.id;

			const result = await this._useCase.findAll({
				userId,
			});

			res.status(200).send({ data: result });
		} catch (e) {
			if (e instanceof NotFoundError) res.status(404).send({ message: e.message });
			else if (e instanceof Error) res.status(500).send({ message: e.message });
		}
	}
}
