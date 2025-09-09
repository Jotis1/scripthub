"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import { GitLab } from "@/components/icons/gitlab";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type RepositoryCardProps = {
	id: string;
	branchName: string;
	provider: string;
	projectName: string;
	projectPath: string;
};

export function RepositoryCard({
	id,
	branchName,
	provider,
	projectName,
	projectPath,
}: RepositoryCardProps) {
	return (
		<Link href={`/repository/${id}`} className="block">
			<Card className="shadow-none hover:bg-primary-foreground transition-colors cursor-pointer">
				<CardHeader>
					<CardTitle className="flex items-center justify-between mb-1.5">
						<div className="flex items-center gap-2">
							{provider === "gitlab" && (
								<GitLab className="size-4" />
							)}
							{projectName}
							<Badge>
								<GitBranch className="size-4" /> {branchName}
							</Badge>
						</div>
						<ExternalLink className="text-muted-foreground hover:text-foreground transition-colors size-4" />
					</CardTitle>
					<CardDescription className="ml-6 truncate max-w-64 text-xs text-blue-600">
						{projectPath}
					</CardDescription>
				</CardHeader>
			</Card>
		</Link>
	);
}
