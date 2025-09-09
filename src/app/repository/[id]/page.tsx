import { CircleDot, Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type RepositoryPageProps = {
	params: Promise<{ id: string }>;
};

export default async function RepositoryPage({ params }: RepositoryPageProps) {
	const { id } = await params;

	return (
		<div className="max-w-7xl mx-auto p-5 space-y-5">
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
					<BreadcrumbItem>{id}</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
