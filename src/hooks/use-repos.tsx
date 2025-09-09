"use client";

import { useEffect, useState } from "react";
import {
	type GitLabProject,
	type GitlabBranch,
	type GitlabGroup,
	getGitlabBranches,
	getGitlabGroups,
	getGitlabProjects,
} from "@/actions/gitlab";
import { auth } from "@/lib/auth/client";

export function useRepos() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>();

	const [groups, setGroups] = useState<GitlabGroup[]>([]);
	const [projects, setProjects] = useState<GitLabProject[]>([]);
	const [branches, setBranches] = useState<GitlabBranch[]>([]);

	useEffect(() => {
		console.log("You should only see this once");

		setLoading(true);

		async function fetchGroups() {
			const authRes = await auth.getAccessToken({
				providerId: "gitlab",
			});

			if (!authRes.data) {
				setError(authRes.error.message);
				setLoading(false);
				return;
			}

			const { accessToken } = authRes.data;

			if (accessToken) {
				const groups = await getGitlabGroups({ accessToken });
				setGroups(groups);
			}
			setLoading(false);
		}

		fetchGroups();
	}, []);

	const getAccessToken = async () => {
		const authRes = await auth.getAccessToken({
			providerId: "gitlab",
		});

		if (!authRes.data) {
			setError(authRes.error.message);
			return;
		}

		return authRes.data.accessToken;
	};

	const selectGroup = async ({ groupId }: { groupId: number }) => {
		setProjects([]);
		setBranches([]);
		setLoading(true);

		const accessToken = await getAccessToken();
		if (!accessToken) return;

		const projects = await getGitlabProjects({ accessToken, groupId });
		setProjects(projects);
		setLoading(false);
	};

	const selectProject = async ({ projectId }: { projectId: number }) => {
		setBranches([]);
		setLoading(true);

		const accessToken = await getAccessToken();
		if (!accessToken) return;

		const branches = await getGitlabBranches({ accessToken, projectId });
		setBranches(branches);
		setLoading(false);
	};

	return {
		loading,
		groups,
		selectGroup,
		projects,
		selectProject,
		branches,
		error,
	};
}
