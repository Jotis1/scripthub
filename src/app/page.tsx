import { Home } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { RepositoryDialog } from "@/components/shared/repository-dialog";
import { RepositoryList } from "@/components/shared/repository-list";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { auth } from "@/lib/auth/server";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main className="max-w-7xl mx-auto p-5 space-y-5">
			<Navbar />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<Home className="size-4" />
						Home
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<RepositoryDialog />
			<RepositoryList />
		</main>
	);
}
