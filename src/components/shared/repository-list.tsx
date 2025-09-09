import { fetchRepositories } from "@/actions/repository-actions";
import { RepositoryCard } from "./repository-card";

export async function RepositoryList() {
	const repositories = await fetchRepositories();

	if (repositories.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-muted-foreground">
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
					createdAt={repo.createdAt}
					// GitLab specific fields
					groupName={repo.groupName}
					groupFullName={repo.groupFullName}
					groupPath={repo.groupPath}
					projectName={repo.projectName}
					projectPath={repo.projectPath}
					projectWebUrl={repo.projectWebUrl}
					projectDefaultBranch={repo.projectDefaultBranch}
					branchProtected={repo.branchProtected}
					branchWebUrl={repo.branchWebUrl}
				/>
			))}
		</div>
	);
}
