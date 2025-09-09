"use server";

import { APP_CONFIG } from "@/lib/constants";
import type {
	GitLabBranch,
	GitLabGroup,
	GitLabGroupParams,
	GitLabGroupProjectsParams,
	GitLabProject,
	GitLabProjectBranchesParams,
	GitLabRequestParams,
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
