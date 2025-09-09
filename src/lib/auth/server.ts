import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { gitlab } from "@/lib/auth/providers/gitlab";
import { APP_CONFIG } from "@/lib/constants";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
	socialProviders: { gitlab },
	session: {
		updateAge: APP_CONFIG.SESSIONS.UPDATE_AGE_SECONDS,
	},
	database: prismaAdapter(prisma, { provider: "postgresql" }),
});
