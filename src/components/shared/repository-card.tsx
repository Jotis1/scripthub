"use client";

import { ExternalLink, Shield } from "lucide-react";
import Link from "next/link";
import { GitLab } from "@/components/icons/gitlab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RepositoryCardProps = {
	id: string;
	branchName: string;
	provider: string;
	createdAt?: Date;
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
};

export function RepositoryCard({
	id,
	branchName,
	provider,
	createdAt,
	// GitLab specific fields
	groupName,
	groupFullName,
	projectName,
	projectPath,
	projectWebUrl,
	branchProtected,
}: RepositoryCardProps) {
	return (
		<Link href={`/repository/${id}`} className="block">
			<Card className="hover:shadow-md transition-shadow cursor-pointer">
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							{provider === "gitlab" && (
								<GitLab className="w-5 h-5" />
							)}
							{projectName}
						</div>
						<ExternalLink className="text-muted-foreground hover:text-foreground transition-colors size-4" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2 text-sm text-muted-foreground">
						<div>
							<span className="font-medium">Group:</span>{" "}
							{groupName}
							{groupFullName && groupName !== groupFullName && (
								<span className="text-xs ml-1">
									({groupFullName})
								</span>
							)}
						</div>
						<div>
							<span className="font-medium">Project:</span>{" "}
							{projectPath || projectName}
						</div>
						<div className="flex items-center gap-2">
							<span className="font-medium">Branch:</span>{" "}
							{branchName}
							{branchProtected && (
								<div
									className="flex items-center"
									title="Protected branch"
								>
									<Shield className="w-3 h-3 text-amber-500" />
								</div>
							)}
						</div>
						<div>
							<span className="font-medium">Provider:</span>{" "}
							{provider}
						</div>
						{createdAt && (
							<div>
								<span className="font-medium">Created:</span>{" "}
								{createdAt.toLocaleDateString()}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
