import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { fetchRepositoryFiles } from "@/actions/gitlab-api";
import { auth } from "@/lib/auth/server";
import { prisma } from "@/lib/db";

interface RouteParams {
	params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
	try {
		// Authenticate user
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { id: repositoryId } = await params;

		// Fetch repository details
		const repository = await prisma.repository.findUnique({
			where: { id: repositoryId },
		});

		if (!repository) {
			return NextResponse.json(
				{ error: "Repository not found" },
				{ status: 404 },
			);
		}

		// Get user's access token from account
		const account = await prisma.account.findFirst({
			where: {
				userId: session.user.id,
				providerId: repository.provider,
			},
		});

		if (!account?.accessToken) {
			return NextResponse.json(
				{ error: "No access token found for this provider" },
				{ status: 401 },
			);
		}

		// Fetch repository files from GitLab
		const files = await fetchRepositoryFiles({
			accessToken: account.accessToken,
			projectId: Number(repository.projectId),
			branchName: repository.branchName,
		});

		return NextResponse.json(files);
	} catch (error) {
		console.error("Error fetching repository files:", error);
		return NextResponse.json(
			{ error: "Failed to fetch repository files" },
			{ status: 500 },
		);
	}
}
