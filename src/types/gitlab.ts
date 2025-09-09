/**
 * GitLab API response types
 * Unified naming convention: GitLab (camelCase)
 */
export interface GitLabEntity {
	id: number;
	name: string;
}

export interface GitLabGroup extends GitLabEntity {
	full_name?: string;
	path?: string;
}

export interface GitLabProject extends GitLabEntity {
	path_with_namespace?: string;
	default_branch?: string;
	web_url?: string;
}

export interface GitLabBranch {
	name: string;
	default?: boolean;
	protected?: boolean;
	web_url?: string;
}

// Request parameters
export interface GitLabRequestParams {
	accessToken: string;
}

export interface GitLabGroupProjectsParams extends GitLabRequestParams {
	groupId: number;
}

export interface GitLabProjectBranchesParams extends GitLabRequestParams {
	projectId: number;
}

export interface GitLabGroupParams extends GitLabRequestParams {
	groupId: number;
}

export interface GitLabRepositoryFilesParams extends GitLabRequestParams {
	projectId: number;
	branchName?: string;
	path?: string;
}

export interface GitLabRawFileParams extends GitLabRequestParams {
	projectId: number;
	filePath: string;
	branchName?: string;
}

export interface GitLabTreeItem {
	id: string;
	name: string;
	type: "tree" | "blob";
	path: string;
	mode: string;
}
