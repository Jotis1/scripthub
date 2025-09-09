import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { createScriptEndpoint } from "@/actions/script-actions";
import { auth } from "@/lib/auth/server";
import type { CreateScriptEndpointParams } from "@/types/script";

export async function POST(request: NextRequest) {
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

		const body: CreateScriptEndpointParams = await request.json();

		// Validate required fields
		if (!body.repositoryId || !body.filePath || !body.servePath) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Create script endpoint
		const endpoint = await createScriptEndpoint(body);

		return NextResponse.json(endpoint, { status: 201 });
	} catch (error) {
		console.error("Error creating script endpoint:", error);

		// Handle specific error types
		if (error instanceof Error) {
			if (error.message.includes("unique")) {
				return NextResponse.json(
					{ error: "Serve path already exists" },
					{ status: 409 },
				);
			}
			if (error.message.includes("must start with '/api/scripts/'")) {
				return NextResponse.json(
					{ error: "Serve path must start with '/api/scripts/'" },
					{ status: 400 },
				);
			}
		}

		return NextResponse.json(
			{ error: "Failed to create script endpoint" },
			{ status: 500 },
		);
	}
}
