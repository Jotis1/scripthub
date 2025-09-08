import type { GitlabOptions } from "better-auth/social-providers";

const { GITLAB_CLIENT_ID, GITLAB_CLIENT_SECRET, GITLAB_URL } = process.env;

if (!GITLAB_CLIENT_ID || !GITLAB_CLIENT_SECRET || !GITLAB_URL) {
	throw new Error("Missing Gitlab environment variables");
}

export const gitlab: GitlabOptions = {
	clientId: GITLAB_CLIENT_ID,
	clientSecret: GITLAB_CLIENT_SECRET,
	issuer: GITLAB_URL,
};
