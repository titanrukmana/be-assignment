import { PrismaUserRepository } from "../../src/infrastructure/PrismaUserRepository";
import { User } from "../../src/domain/User";
import { prismaMock } from "../singleton";

describe("PrismaUserRepository", () => {
	let prismaUserRepository: PrismaUserRepository;

	beforeEach(() => {
		// Create a new instance of PrismaUserRepository with the mocked PrismaClient
		prismaUserRepository = new PrismaUserRepository(prismaMock);
	});

	afterEach(() => {
		// Clear mock function calls after each test
		jest.clearAllMocks();
	});

	test("should create new user", async () => {
		const now = new Date();
		const user: User = {
			id: 3,
			username: "Nice",
			password: "test",
			createdAt: now,
		};

		prismaMock.user.create.mockResolvedValue(user);

		const res = await prismaUserRepository.save(user);

		expect(res).toEqual(3);
	});
});
