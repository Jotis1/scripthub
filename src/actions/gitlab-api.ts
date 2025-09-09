"use server";

import { APP_CONFIG } from "@/lib/constants";
import type {
	GitLabBranch,
	GitLabGroup,
	GitLabGroupParams,
	GitLabGroupProjectsParams,
	GitLabProject,
	GitLabProjectBranchesParams,
	GitLabRawFileParams,
	GitLabRepositoryFilesParams,
	GitLabRequestParams,
	GitLabTreeItem,
} from "@/types/gitlab";

const GITLAB_API_BASE_URL = `${APP_CONFIG.API.GITLAB_BASE_URL}/api/${APP_CONFIG.API.GITLAB_API_VERSION}`;

/**
 * Creates authorization headers for GitLab API requests
 */
const createAuthHeaders = (accessToken: string): HeadersInit => ({
	Authorization: `Bearer ${accessToken}`,
	"Content-Type": "application/json",
});

/**
 * Generic GitLab API request handler with error handling
 */
async function gitLabApiRequest<T>(
	endpoint: string,
	accessToken: string,
	searchParams?: URLSearchParams,
): Promise<T> {
	const cleanEndpoint = endpoint.startsWith("/")
		? endpoint.slice(1)
		: endpoint;
	const fullUrl = `${GITLAB_API_BASE_URL}/${cleanEndpoint}`;
	const url = new URL(fullUrl);

	if (searchParams) {
		url.search = searchParams.toString();
	}

	const response = await fetch(url.toString(), {
		headers: createAuthHeaders(accessToken),
	});

	if (!response.ok) {
		throw new Error(
			`GitLab API error: ${response.status} ${response.statusText}`,
		);
	}

	console.log("GitLab API response status:", response.status);

	return response.json() as Promise<T>;
}

/**
 * Fetches a specific GitLab group by ID
 */
export async function fetchGroupById({
	accessToken,
	groupId,
}: GitLabGroupParams): Promise<GitLabGroup> {
	return gitLabApiRequest<GitLabGroup>(`/groups/${groupId}`, accessToken);
}

/**
 * Fetches all GitLab groups for the authenticated user
 */
export async function fetchUserGroups({
	accessToken,
}: GitLabRequestParams): Promise<GitLabGroup[]> {
	const searchParams = new URLSearchParams({ simple: "true" });
	return gitLabApiRequest<GitLabGroup[]>(
		"/groups",
		accessToken,
		searchParams,
	);
}

/**
 * Fetches projects for a specific GitLab group
 */
export async function fetchGroupProjects({
	accessToken,
	groupId,
}: GitLabGroupProjectsParams): Promise<GitLabProject[]> {
	console.log("Fetching projects for group ID:", groupId);

	const searchParams = new URLSearchParams({ simple: "true" });
	return gitLabApiRequest<GitLabProject[]>(
		`/groups/${groupId}/projects`,
		accessToken,
		searchParams,
	);
}

/**
 * Fetches branches for a specific GitLab project
 */
export async function fetchProjectBranches({
	accessToken,
	projectId,
}: GitLabProjectBranchesParams): Promise<GitLabBranch[]> {
	return gitLabApiRequest<GitLabBranch[]>(
		`/projects/${projectId}/repository/branches`,
		accessToken,
	);
}

/**
 * Fetches repository files for a specific GitLab project and branch
 */
export async function fetchRepositoryFiles({
	accessToken,
	projectId,
	branchName = "main",
	path = "",
}: GitLabRepositoryFilesParams): Promise<GitLabTreeItem[]> {
	const searchParams = new URLSearchParams({
		ref: branchName,
		recursive: "true",
	});

	if (path) {
		searchParams.append("path", path);
	}

	return gitLabApiRequest<GitLabTreeItem[]>(
		`/projects/${projectId}/repository/tree`,
		accessToken,
		searchParams,
	);
}

/**
 * Fetches raw file content from GitLab repository
 */
export async function fetchRawFileContent({
	accessToken,
	projectId,
	filePath,
	branchName = "main",
}: GitLabRawFileParams): Promise<string> {
	const encodedFilePath = encodeURIComponent(filePath);
	const searchParams = new URLSearchParams({ ref: branchName });

	const response = await fetch(
		`${GITLAB_API_BASE_URL}/projects/${projectId}/repository/files/${encodedFilePath}/raw?${searchParams.toString()}`,
		{
			headers: createAuthHeaders(accessToken),
		},
	);

	if (!response.ok) {
		throw new Error(
			`GitLab API error: ${response.status} ${response.statusText}`,
		);
	}

	return response.text();
}
