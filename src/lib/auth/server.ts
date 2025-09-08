import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { gitlab } from "@/lib/auth/providers/gitlab";
import { PrismaClient } from "@/lib/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
	socialProviders: { gitlab },
	database: prismaAdapter(prisma, { provider: "postgresql" }),
});
