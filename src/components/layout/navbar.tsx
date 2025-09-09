import { headers } from "next/headers";
import { auth } from "@/lib/auth/server";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function Navbar() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	const { user } = session;

	return (
		<nav className="flex items-center justify-between border border-border py-2.5 px-5 w-full rounded-lg">
			<h1 className="text-sm font-medium">ScriptHub</h1>
			{user && (
				<div className="flex items-center text-sm">
					{user.name}
					<Avatar className="ml-2.5 size-5">
						{user.image && <AvatarImage src={user.image} />}
						<AvatarFallback>
							{user.name?.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			)}
		</nav>
	);
}
