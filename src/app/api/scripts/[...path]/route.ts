import { type NextRequest, NextResponse } from "next/server";
import { fetchRawFileContent } from "@/actions/gitlab-api";
import { fetchScriptEndpointByPath } from "@/actions/script-actions";
import { prisma } from "@/lib/db";

interface RouteParams {
	params: Promise<{ path: string[] }>;
}

export async function GET(_: NextRequest, { params }: RouteParams) {
	try {
		const { path: pathSegments } = await params;
		const servePath = `/api/scripts/${pathSegments.join("/")}`;

		const endpoint = await fetchScriptEndpointByPath(servePath);

		console.log("Found endpoint:", endpoint);

		if (!endpoint) {
			console.warn("No script endpoint found for path:", servePath);
			return NextResponse.json(
				{ error: "Script endpoint not found" },
				{ status: 404 },
			);
		}

		// Get access token for the repository provider
		// We need to get any user's token for this provider
		// In a production app, you might want to use a service account
		const account = await prisma.account.findFirst({
			where: {
				providerId: endpoint.repository.provider,
			},
		});

		if (!account?.accessToken) {
			return NextResponse.json(
				{ error: "No access token available for this repository" },
				{ status: 500 },
			);
		}

		// Fetch the raw PowerShell script content
		const scriptContent = await fetchRawFileContent({
			accessToken: account.accessToken,
			projectId: Number(endpoint.repository.projectId),
			filePath: endpoint.filePath,
			branchName: endpoint.repository.branchName,
		});

		// Return the PowerShell script as plain text
		return new NextResponse(scriptContent, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"X-Script-Path": endpoint.filePath,
				"X-Repository": endpoint.repository.projectName,
				"X-Branch": endpoint.repository.branchName,
			},
		});
	} catch (error) {
		console.error("Error serving script:", error);
		return NextResponse.json(
			{ error: "Failed to serve script" },
			{ status: 500 },
		);
	}
}
