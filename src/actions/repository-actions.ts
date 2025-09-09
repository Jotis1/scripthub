"use server";

import { prisma } from "@/lib/db";
import type { CreateRepositoryParams } from "@/types/repository";

/**
 * Creates a new repository record in the database
 */
export async function addRepository({
	groupId,
	projectId,
	branchName,
	provider,
	// GitLab specific fields
	groupName,
	groupFullName,
	groupPath,
	projectName,
	projectPath,
	projectWebUrl,
	projectDefaultBranch,
	branchProtected,
	branchWebUrl,
}: CreateRepositoryParams) {
	try {
		return await prisma.repository.create({
			data: {
				groupId,
				projectId,
				branchName,
				provider,
				// GitLab specific fields
				groupName,
				groupFullName,
				groupPath,
				projectName,
				projectPath,
				projectWebUrl,
				projectDefaultBranch,
				branchProtected,
				branchWebUrl,
			},
		});
	} catch (error) {
		console.error("Failed to create repository:", error);
		throw new Error("Failed to create repository");
	}
}

/**
 * Fetches all repositories from the database
 */
export async function fetchRepositories() {
	try {
		return await prisma.repository.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.error("Failed to fetch repositories:", error);
		throw new Error("Failed to fetch repositories");
	}
}
