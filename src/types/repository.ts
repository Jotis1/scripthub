import type { Provider } from "@/lib/prisma";

/**
 * Repository form schema types
 */
export interface RepositoryFormData {
	groupId: string;
	projectId: string;
	branchName: string;
}

export interface CreateRepositoryParams extends RepositoryFormData {
	provider: Provider;
	// GitLab specific fields
	groupName: string;
	groupFullName: string;
	groupPath: string;
	projectName: string;
	projectPath: string;
	projectWebUrl: string;
	projectDefaultBranch: string;
	branchProtected: boolean;
	branchWebUrl: string;
}

/**
 * API response types
 */
export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
}

/**
 * Loading states
 */
export interface LoadingState {
	isLoading: boolean;
	error: string | null;
}

/**
 * Selection handlers
 */
export interface SelectionHandlers {
	onGroupSelect: (groupId: number) => Promise<void>;
	onProjectSelect: (projectId: number) => Promise<void>;
	onBranchSelect: (branchName: string) => void;
}
