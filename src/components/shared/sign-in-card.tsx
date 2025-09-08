"use client";

import { GitHub } from "@/components/icons/github";
import { GitLab } from "@/components/icons/gitlab";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/lib/auth/client";

export function SignInCard() {
	const signInWithGitLab = () => {
		auth.signIn.social({
			provider: "gitlab",
			scopes: ["api", "read_api", "read_user"],
		});
	};

	return (
		<Card className="w-72">
			<CardHeader className="text-center">
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>Serve your scripts with ease</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<Button
					type="button"
					variant="outline"
					className="w-full"
					onClick={signInWithGitLab}
				>
					<GitLab className="size-4" />
					Continue with GitLab
				</Button>
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="cursor-not-allowed">
							<Button
								type="button"
								variant="outline"
								className="w-full"
								disabled
							>
								<GitHub className="size-4" />
								Continue with GitHub
							</Button>
						</span>
					</TooltipTrigger>
					<TooltipContent side="bottom">
						<p>Coming soon</p>
					</TooltipContent>
				</Tooltip>
			</CardContent>
		</Card>
	);
}
