import { CircleDot, FileCode2, GitBranch, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { ScriptSelectionDialog } from "@/components/shared/script-selection-dialog";
import { ScriptEndpointsList } from "@/components/shared/script-endpoints-list";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";

type RepositoryPageProps = {
	params: Promise<{ id: string }>;
};

export default async function RepositoryPage({ params }: RepositoryPageProps) {
	const { id } = await params;

	// Fetch repository details
	const repository = await prisma.repository.findUnique({
		where: { id },
	});

	if (!repository) {
		return (
			<div className="max-w-7xl mx-auto p-5 space-y-5">
				<Navbar />
				<div className="text-center py-12">
					<h1 className="text-2xl font-bold text-red-600 mb-2">
						Repository Not Found
					</h1>
					<p className="text-muted-foreground">
						The repository you're looking for doesn't exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto p-5 space-y-6">
			<Navbar />

			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Home className="size-4" />
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<CircleDot className="size-4" />
						Repository
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>{repository.projectName}</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			{/* Repository Info */}
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<FileCode2 className="size-5" />
								{repository.projectName}
								<Badge variant="outline" className="ml-2">
									<GitBranch className="size-3 mr-1" />
									{repository.branchName}
								</Badge>
							</CardTitle>
							<CardDescription className="mt-1">
								{repository.projectPath}
							</CardDescription>
						</div>
						<ScriptSelectionDialog repositoryId={id} />
					</div>
				</CardHeader>
			</Card>

			{/* Script Endpoints */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-lg font-semibold">Script Endpoints</h2>
				</div>
				<ScriptEndpointsList repositoryId={id} />
			</div>
		</div>
	);
}
