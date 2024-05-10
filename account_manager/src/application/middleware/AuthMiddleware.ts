import { SupabaseClient } from "@supabase/supabase-js";
import { FastifyReply, FastifyRequest } from "fastify";

export const AuthMiddleware = (supabaseClient: SupabaseClient) => {
	return async (req: FastifyRequest, res: FastifyReply) => {
		const { data, error } = await supabaseClient.auth.getUser(req.cookies.accessToken);

		if (error || !data.user) res.status(401).send("Unauthorized!");

		req.user = data.user!;
	};
};
