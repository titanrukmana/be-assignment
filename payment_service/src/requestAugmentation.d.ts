import { User } from "@supabase/supabase-js";
import { FastifyRequest } from "fastify";

declare module "fastify" {
	interface FastifyRequest {
		user?: User;
	}
}
