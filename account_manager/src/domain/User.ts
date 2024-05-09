export class User {
	public constructor(
		public readonly id: number,
		public readonly username: string,
		public readonly password: string,
		public readonly createdAt: Date
	) {}
}
