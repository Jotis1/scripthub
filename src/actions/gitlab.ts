"use server";

const { GITLAB_URL } = process.env;

export type GitLabProject = {
	id: number;
	name: string;
};

export type GitlabGroup = GitLabProject;
export type GitlabBranch = {
	name: string;
};

export async function getGitlabGroups({
	accessToken,
}: {
	accessToken: string;
}) {
	const url = new URL("/api/v4/groups", GITLAB_URL);
	url.searchParams.set("simple", "true");

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch GitLab groups");
	}

	return res.json() as Promise<GitlabGroup[]>;
}

export async function getGitlabProjects({
	accessToken,
	groupId,
}: {
	accessToken: string;
	groupId?: number;
}) {
	const url = new URL(`/api/v4/groups/${groupId}/projects`, GITLAB_URL);
	url.searchParams.set("simple", "true");

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch GitLab projects");
	}

	return res.json() as Promise<GitLabProject[]>;
}

export async function getGitlabBranches({
	accessToken,
	projectId,
}: {
	accessToken: string;
	projectId: number;
}) {
	const url = new URL(
		`/api/v4/projects/${projectId}/repository/branches`,
		GITLAB_URL,
	);

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch GitLab branches");
	}

	return res.json() as Promise<GitlabBranch[]>;
}
