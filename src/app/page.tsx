import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AddRepository } from "@/components/shared/add-repository";
import { auth } from "@/lib/auth/server";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<main className="p-5">
			<h1>Welcome {session.user.name}</h1>
			<header className="max-w-3xl w-full flex items-center justify-between">
				<h1>Your Repositories</h1>
				<AddRepository />
			</header>
		</main>
	);
}
