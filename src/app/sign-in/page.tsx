import { SignInCard } from "@/components/shared/sign-in-card";

export default async function SignIn() {
	return (
		<main className="h-dvh flex items-center *:size-full p-5">
			<div className={"flex items-center justify-center"}>
				<SignInCard />
			</div>
			<aside className="size-full bg-zinc-100 rounded-lg"></aside>
		</main>
	);
}
