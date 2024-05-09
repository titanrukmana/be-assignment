import { Server } from "./presentation/_index";

export async function main(): Promise<void> {
	const server = new Server();

	await server.run(8000);
}

main();
