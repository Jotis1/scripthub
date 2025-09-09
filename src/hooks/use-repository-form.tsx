"use client";

import { useCallback, useEffect, useState } from "react";
import {
	fetchGroupProjects,
	fetchProjectBranches,
	fetchUserGroups,
} from "@/actions/gitlab-api";
import { auth } from "@/lib/auth/client";
import type { GitLabBranch, GitLabGroup, GitLabProject } from "@/types/gitlab";
import type { LoadingState, SelectionHandlers } from "@/types/repository";

interface UseRepositoryFormReturn extends LoadingState, SelectionHandlers {
	groups: GitLabGroup[];
	projects: GitLabProject[];
	branches: GitLabBranch[];
	selectedGroup: GitLabGroup | null;
	selectedProject: GitLabProject | null;
	selectedBranch: GitLabBranch | null;
}

export function useRepositoryForm(): UseRepositoryFormReturn {
	const [loadingState, setLoadingState] = useState<LoadingState>({
		isLoading: false,
		error: null,
	});

	const [groups, setGroups] = useState<GitLabGroup[]>([]);
	const [projects, setProjects] = useState<GitLabProject[]>([]);
	const [branches, setBranches] = useState<GitLabBranch[]>([]);
	const [selectedGroup, setSelectedGroup] = useState<GitLabGroup | null>(
		null,
	);
	const [selectedProject, setSelectedProject] =
		useState<GitLabProject | null>(null);
	const [selectedBranch, setSelectedBranch] = useState<GitLabBranch | null>(
		null,
	);

	/**
	 * Retrieves GitLab access token
	 */
	const getAccessToken = useCallback(async (): Promise<string | null> => {
		try {
			const authResponse = await auth.getAccessToken({
				providerId: "gitlab",
			});

			if (!authResponse.data) {
				setLoadingState((prev) => ({
					...prev,
					error:
						authResponse.error?.message || "Authentication failed",
				}));
				return null;
			}

			return authResponse.data.accessToken;
		} catch (error) {
			setLoadingState((prev) => ({
				...prev,
				error:
					error instanceof Error
						? error.message
						: "Authentication failed",
			}));
			return null;
		}
	}, []);

	/**
	 * Fetches initial groups data
	 */
	const fetchInitialGroups = useCallback(async () => {
		setLoadingState({ isLoading: true, error: null });

		try {
			const accessToken = await getAccessToken();
			if (!accessToken) return;

			const groupsData = await fetchUserGroups({ accessToken });
			setGroups(groupsData);
		} catch (error) {
			setLoadingState((prev) => ({
				...prev,
				error:
					error instanceof Error
						? error.message
						: "Failed to fetch groups",
			}));
		} finally {
			setLoadingState((prev) => ({ ...prev, isLoading: false }));
		}
	}, [getAccessToken]);

	/**
	 * Handles group selection and loads projects
	 */
	const onGroupSelect = useCallback(
		async (groupId: number): Promise<void> => {
			// Reset dependent states
			setProjects([]);
			setBranches([]);
			setSelectedProject(null);
			setSelectedBranch(null);
			setLoadingState({ isLoading: true, error: null });

			try {
				const accessToken = await getAccessToken();
				if (!accessToken) return;

				// Find and set selected group
				const group = groups.find((g) => g.id === groupId);
				setSelectedGroup(group || null);

				const projectsData = await fetchGroupProjects({
					accessToken,
					groupId,
				});
				setProjects(projectsData);
			} catch (error) {
				setLoadingState((prev) => ({
					...prev,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch projects",
				}));
			} finally {
				setLoadingState((prev) => ({ ...prev, isLoading: false }));
			}
		},
		[getAccessToken, groups],
	);

	/**
	 * Handles project selection and loads branches
	 */
	const onProjectSelect = useCallback(
		async (projectId: number): Promise<void> => {
			// Reset dependent state
			setBranches([]);
			setSelectedBranch(null);
			setLoadingState({ isLoading: true, error: null });

			try {
				const accessToken = await getAccessToken();
				if (!accessToken) return;

				// Find and set selected project
				const project = projects.find((p) => p.id === projectId);
				setSelectedProject(project || null);

				const branchesData = await fetchProjectBranches({
					accessToken,
					projectId,
				});
				setBranches(branchesData);
			} catch (error) {
				setLoadingState((prev) => ({
					...prev,
					error:
						error instanceof Error
							? error.message
							: "Failed to fetch branches",
				}));
			} finally {
				setLoadingState((prev) => ({ ...prev, isLoading: false }));
			}
		},
		[getAccessToken, projects],
	);

	/**
	 * Handles branch selection
	 */
	const onBranchSelect = useCallback(
		(branchName: string): void => {
			const branch = branches.find((b) => b.name === branchName);
			setSelectedBranch(branch || null);
		},
		[branches],
	);

	// Initialize groups on mount
	useEffect(() => {
		fetchInitialGroups();
	}, [fetchInitialGroups]);

	return {
		isLoading: loadingState.isLoading,
		error: loadingState.error,
		groups,
		projects,
		branches,
		selectedGroup,
		selectedProject,
		selectedBranch,
		onGroupSelect,
		onProjectSelect,
		onBranchSelect,
	};
}
