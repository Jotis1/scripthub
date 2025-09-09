/**
 * Application configuration constants
 */
export const APP_CONFIG = {
	PROVIDERS: {
		GITLAB: "gitlab" as const,
		GITHUB: "github" as const,
	},
	SESSIONS: {
		UPDATE_AGE_HOURS: 2, // 2 hours
		UPDATE_AGE_SECONDS: 2 * 60 * 60, // 2 hours in seconds
	},
	API: {
		GITLAB_BASE_URL: process.env.GITLAB_URL as string,
		GITLAB_API_VERSION: "v4",
	},
} as const;

/**
 * API endpoint paths
 */
export const API_ENDPOINTS = {
	GITLAB: {
		GROUPS: "/groups",
		PROJECTS: "/projects",
		BRANCHES: "/repository/branches",
		GROUP_PROJECTS: (groupId: number) => `/groups/${groupId}/projects`,
		PROJECT_BRANCHES: (projectId: number) =>
			`/projects/${projectId}/repository/branches`,
	},
} as const;

/**
 * Form validation messages
 */
export const VALIDATION_MESSAGES = {
	REQUIRED: {
		GROUP: "Group is required",
		PROJECT: "Project is required",
		BRANCH: "Branch is required",
	},
	ERRORS: {
		AUTH_FAILED: "Authentication failed",
		FETCH_GROUPS: "Failed to fetch groups",
		FETCH_PROJECTS: "Failed to fetch projects",
		FETCH_BRANCHES: "Failed to fetch branches",
		CREATE_REPOSITORY: "Failed to create repository",
		GITLAB_API: "GitLab API error",
	},
} as const;

/**
 * UI text constants
 */
export const UI_TEXT = {
	PLACEHOLDERS: {
		SELECT_GROUP: "Select a group",
		SELECT_PROJECT: "Select a project",
		SELECT_BRANCH: "Select a branch",
	},
	DESCRIPTIONS: {
		GROUP: "Select the group that contains the project",
		PROJECT: "Select the project you want to track",
		BRANCH: "Select the branch you want to track",
	},
	LOADING: {
		GROUPS: "Loading groups...",
		PROJECTS: "Loading projects...",
		BRANCHES: "Loading branches...",
		GENERAL: "Loading...",
	},
	EMPTY_STATES: {
		NO_GROUPS: "No groups available",
		NO_PROJECTS: "No projects available",
		NO_BRANCHES: "No branches available",
	},
} as const;
