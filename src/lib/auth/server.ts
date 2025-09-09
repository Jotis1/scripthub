import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { gitlab } from "@/lib/auth/providers/gitlab";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
	socialProviders: { gitlab },
	session: {
		updateAge: 2 * 60 * 60, // 2 hours
	},
	database: prismaAdapter(prisma, { provider: "postgresql" }),
});
