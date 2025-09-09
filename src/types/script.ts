export interface PowerShellFile {
	id: string;
	name: string;
	path: string;
	selected: boolean;
	customPath?: string;
	requiresAuth?: boolean;
	username?: string;
	password?: string;
}

export interface ScriptEndpointFormData {
	filePath: string;
	servePath: string;
	requiresAuth?: boolean;
	username?: string;
	password?: string;
}

export interface CreateScriptEndpointParams {
	repositoryId: string;
	filePath: string;
	servePath: string;
	requiresAuth?: boolean;
	username?: string;
	password?: string;
}

export interface ScriptEndpointWithRepository {
	id: string;
	repositoryId: string;
	filePath: string;
	servePath: string;
	isActive: boolean;
	requiresAuth: boolean;
	username?: string | null;
	passwordHash?: string | null;
	createdAt: Date;
	updatedAt: Date;
	repository: {
		projectName: string;
		branchName: string;
		provider: string;
	};
}
