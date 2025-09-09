"use server";

import { prisma } from "@/lib/db";
import type { Provider } from "@/lib/prisma";

type Props = {
	groupId: string;
	projectId: string;
	branchName: string;
	provider: Provider;
};

export async function addRepository({
	groupId,
	projectId,
	branchName,
	provider,
}: Props) {
	return await prisma.repository.create({
		data: {
			groupId,
			projectId,
			branchName,
			provider,
		},
	});
}
