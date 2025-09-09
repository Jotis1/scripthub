import { Frown } from "lucide-react";
import { fetchRepositories } from "@/actions/repository-actions";
import { RepositoryCard } from "./repository-card";

export async function RepositoryList() {
	const repositories = await fetchRepositories();

	if (repositories.length === 0) {
		return (
			<div className="text-center py-8 border border-dashed border-border rounded-lg">
				<p className="text-muted-foreground text-sm">
					<Frown className="size-5 mx-auto mb-2" />
					No repositories saved yet.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{repositories.map((repo) => (
				<RepositoryCard
					key={repo.id}
					id={repo.id}
					branchName={repo.branchName}
					provider={repo.provider}
					projectName={repo.projectName}
					projectPath={repo.projectPath}
				/>
			))}
		</div>
	);
}
