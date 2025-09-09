import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ScriptHub",
	description: "A modern web application for serving PowerShell scripts from GitLab repositories as HTTP endpoints. Connect repositories, create custom endpoints, and access your scripts via HTTP.",
	keywords: ["PowerShell", "scripts", "GitLab", "HTTP endpoints", "repository management", "automation"],
	authors: [{ name: "Jotis" }],
	creator: "Jotis",
	openGraph: {
		title: "ScriptHub",
		description: "Serve PowerShell scripts from GitLab repositories as HTTP endpoints",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: "ScriptHub",
		description: "Serve PowerShell scripts from GitLab repositories as HTTP endpoints",
	},
};
