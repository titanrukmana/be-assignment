import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const currencies = [
		{ code: "IDR", toUsd: 0.000071 },
		{ code: "USD", toUsd: 1 },
		{ code: "CHF", toUsd: 1.09 },
		{ code: "SGD", toUsd: 0.74 },
		{ code: "MYR", toUsd: 0.24 },
		{ code: "RMB", toUsd: 0.15 },
		{ code: "CAD", toUsd: 0.81 },
		{ code: "EUR", toUsd: 1.22 },
		{ code: "GBP", toUsd: 1.41 },
	];

	for (const currency of currencies) {
		await prisma.currency.create({
			data: {
				code: currency.code,
				toUsd: currency.toUsd,
			},
		});
	}

	console.log("Currencies seeded successfully.");
}

main()
	.catch(async (error) => {
		console.error("Error seeding currencies:", error);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
