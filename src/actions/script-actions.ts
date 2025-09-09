"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import type {
	CreateScriptEndpointParams,
	ScriptEndpointWithRepository,
} from "@/types/script";

/**
 * Creates a new script endpoint
 */
export async function createScriptEndpoint({
	repositoryId,
	filePath,
	servePath,
	requiresAuth = false,
	username,
	password,
}: CreateScriptEndpointParams) {
	try {
		// Ensure servePath starts with /api/scripts/
		let normalizedServePath = servePath;
		if (!normalizedServePath.startsWith("/api/scripts/")) {
			throw new Error("Serve path must start with '/api/scripts/'");
		}

		// Ensure it starts with /
		if (!normalizedServePath.startsWith("/")) {
			normalizedServePath = `/${normalizedServePath}`;
		}

		// Validate auth fields if authentication is required
		if (requiresAuth) {
			if (!username?.trim()) {
				throw new Error(
					"Username is required when authentication is enabled",
				);
			}
			if (!password?.trim()) {
				throw new Error(
					"Password is required when authentication is enabled",
				);
			}
		}

		// Hash password if provided
		let passwordHash: string | undefined;
		if (requiresAuth && password) {
			passwordHash = await bcrypt.hash(password, 12);
		}

		return await prisma.scriptEndpoint.create({
			data: {
				repositoryId,
				filePath,
				servePath: normalizedServePath,
				isActive: true,
				requiresAuth,
				username: requiresAuth ? username : null,
				passwordHash: requiresAuth ? passwordHash : null,
			},
			include: {
				repository: {
					select: {
						projectName: true,
						branchName: true,
						provider: true,
					},
				},
			},
		});
	} catch (error) {
		console.error("Failed to create script endpoint:", error);
		throw new Error("Failed to create script endpoint");
	}
}

/**
 * Fetches all script endpoints for a repository
 */
export async function fetchScriptEndpointsByRepository(
	repositoryId: string,
): Promise<ScriptEndpointWithRepository[]> {
	try {
		return await prisma.scriptEndpoint.findMany({
			where: { repositoryId },
			include: {
				repository: {
					select: {
						projectName: true,
						branchName: true,
						provider: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		console.error("Failed to fetch script endpoints:", error);
		throw new Error("Failed to fetch script endpoints");
	}
}

/**
 * Fetches a script endpoint by serve path
 */
export async function fetchScriptEndpointByPath(servePath: string) {
	try {
		const normalizedPath = servePath.startsWith("/")
			? servePath
			: `/${servePath}`;

		return await prisma.scriptEndpoint.findUnique({
			where: {
				servePath: normalizedPath,
				isActive: true,
			},
			include: {
				repository: true,
			},
		});
	} catch (error) {
		console.error("Failed to fetch script endpoint by path:", error);
		throw new Error("Failed to fetch script endpoint");
	}
}

/**
 * Toggles the active status of a script endpoint
 */
export async function toggleScriptEndpointStatus(
	endpointId: string,
	isActive: boolean,
) {
	try {
		return await prisma.scriptEndpoint.update({
			where: { id: endpointId },
			data: { isActive },
			include: {
				repository: {
					select: {
						projectName: true,
						branchName: true,
						provider: true,
					},
				},
			},
		});
	} catch (error) {
		console.error("Failed to toggle script endpoint status:", error);
		throw new Error("Failed to update script endpoint");
	}
}

/**
 * Deletes a script endpoint
 */
export async function deleteScriptEndpoint(endpointId: string) {
	try {
		return await prisma.scriptEndpoint.delete({
			where: { id: endpointId },
		});
	} catch (error) {
		console.error("Failed to delete script endpoint:", error);
		throw new Error("Failed to delete script endpoint");
	}
}
