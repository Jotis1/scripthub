export interface PowerShellFile {
	id: string;
	name: string;
	path: string;
	selected: boolean;
	customPath?: string;
}

export interface ScriptEndpointFormData {
	filePath: string;
	servePath: string;
}

export interface CreateScriptEndpointParams {
	repositoryId: string;
	filePath: string;
	servePath: string;
}

export interface ScriptEndpointWithRepository {
	id: string;
	repositoryId: string;
	filePath: string;
	servePath: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	repository: {
		projectName: string;
		branchName: string;
		provider: string;
	};
}
