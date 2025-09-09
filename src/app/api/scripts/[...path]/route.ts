import { type NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { fetchRawFileContent } from "@/actions/gitlab-api";
import { fetchScriptEndpointByPath } from "@/actions/script-actions";
import { prisma } from "@/lib/db";

interface RouteParams {
	params: Promise<{ path: string[] }>;
}

/**
 * Validates basic authentication credentials
 */
async function validateBasicAuth(
	request: NextRequest,
	endpoint: { username: string | null; passwordHash: string | null },
): Promise<boolean> {
	const authorization = request.headers.get("authorization");

	if (!authorization || !authorization.startsWith("Basic ")) {
		return false;
	}

	try {
		const encoded = authorization.slice("Basic ".length);
		const decoded = Buffer.from(encoded, "base64").toString("utf-8");
		const [username, password] = decoded.split(":");

		if (
			!username ||
			!password ||
			!endpoint.username ||
			!endpoint.passwordHash
		) {
			return false;
		}

		// Check username match and password hash
		const isUsernameValid = username === endpoint.username;
		const isPasswordValid = await bcrypt.compare(
			password,
			endpoint.passwordHash,
		);

		return isUsernameValid && isPasswordValid;
	} catch (error) {
		console.error("Error validating basic auth:", error);
		return false;
	}
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

		// Check if authentication is required
		if (endpoint.requiresAuth) {
			const isAuthenticated = await validateBasicAuth(request, endpoint);

			if (!isAuthenticated) {
				return new NextResponse("Authentication required", {
					status: 401,
					headers: {
						"WWW-Authenticate": 'Basic realm="Script Access"',
					},
				});
			}
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
