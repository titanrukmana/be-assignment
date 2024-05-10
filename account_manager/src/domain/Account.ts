import { IUserPublicDto } from "../entity/UserDto";

export class Account {
	public constructor(
		public readonly id: number,
		public readonly type: string,
		public readonly paymentIdentifier: string,
		public readonly balance: number,
		public readonly user: IUserPublicDto
	) {}
}
