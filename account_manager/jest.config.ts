import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
	clearMocks: true,
	preset: "ts-jest",
	testEnvironment: "node",
	setupFilesAfterEnv: ["<rootDir>/__test__/singleton.ts"],
};
export default config;
