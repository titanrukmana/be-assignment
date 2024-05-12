import { PaymentHistory } from "../../domain/HistoryDto";
import { IDepositDto, ISendDto, IWithdrawDto, IHistoryDto } from "../../domain/TransactionDto";

export interface ITransactionRepository {
	sendOut(input: ISendDto): Promise<void>;
	send(input: ISendDto): Promise<void>;
	withdraw(input: IWithdrawDto): Promise<void>;
	deposit(input: IDepositDto): Promise<void>;
	find(input: IHistoryDto): Promise<PaymentHistory[]>;
}
