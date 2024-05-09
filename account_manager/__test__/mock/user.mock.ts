import { PrismaClient } from "@prisma/client";

import prisma from "../../src/shared/prisma";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

jest.mock("../../src/shared/prisma", () => ({
	__esModule: true,
	default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
