import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RepositoryDialog } from "@/components/shared/repository-dialog";
import { RepositoryList } from "@/components/shared/repository-list";
import { auth } from "@/lib/auth/server";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	const { user } = session;

	return (
		<main className="max-w-7xl mx-auto p-6">
			<div className="space-y-6">
				<header className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold tracking-tight">
							Welcome back, {user.name}
						</h1>
						<p className="text-muted-foreground">
							Manage your repositories and track your projects
						</p>
					</div>
				</header>

				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">
							Your Repositories
						</h2>
						<RepositoryDialog />
					</div>

					<RepositoryList />
				</section>
			</div>
		</main>
	);
}
