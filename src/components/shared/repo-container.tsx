import type { Repository } from "@/lib/prisma";

const sampleRepo: Repository = {
	id: "1",
	groupId: "1",
	projectId: "1",
	branchName: "main",
	createdAt: new Date(),
	updatedAt: new Date(),
	provider: "gitlab",
};

export function RepositoriesContainer() {
	return <section></section>;
}
