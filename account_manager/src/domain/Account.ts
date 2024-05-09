import { PaymentHistory } from "@prisma/client";
import { User } from "./User";
import { IUserPublicDto } from "../entity/UserDto";

export class Account {
	public constructor(public readonly id: number, public readonly type: string, public readonly user: IUserPublicDto) {}
}
