import { IDepositDto, ISendDto, IWithdrawDto } from "../../domain/TransactionDto";

export interface ITransactionRepository {
	send(input: ISendDto): Promise<void>;
	withdraw(input: IWithdrawDto): Promise<void>;
	deposit(input: IDepositDto): Promise<void>;
}
