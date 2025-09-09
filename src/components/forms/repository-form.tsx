"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Blocks } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addRepository } from "@/actions/repository-actions";
import { BranchSelectField } from "@/components/ui/branch-select-field";
import { Form, FormField } from "@/components/ui/form";
import { FormSelectField } from "@/components/ui/form-select-field";
import { useRepositoryForm } from "@/hooks/use-repository-form";
import type { RepositoryFormData } from "@/types/repository";

const repositoryFormSchema = z.object({
	groupId: z.string().min(1, "Group is required"),
	projectId: z.string().min(1, "Project is required"),
	branchName: z.string().min(1, "Branch is required"),
});

interface RepositoryFormProps {
	children?: React.ReactNode;
	onSuccess?: () => void;
}

export function RepositoryForm({ children, onSuccess }: RepositoryFormProps) {
	const form = useForm<RepositoryFormData>({
		resolver: zodResolver(repositoryFormSchema),
		defaultValues: {
			groupId: "",
			projectId: "",
			branchName: "",
		},
	});

	const {
		groups,
		projects,
		branches,
		selectedGroup,
		selectedProject,
		selectedBranch,
		onGroupSelect,
		onProjectSelect,
		onBranchSelect,
		isLoading,
		error,
	} = useRepositoryForm();

	const handleGroupSelectionChange = (value: string) => {
		form.setValue("groupId", value);
		form.setValue("projectId", "");
		form.setValue("branchName", "");
		onGroupSelect(Number(value));
	};

	const handleProjectSelectionChange = (value: string) => {
		form.setValue("projectId", value);
		form.setValue("branchName", "");
		onProjectSelect(Number(value));
	};

	const handleBranchSelectionChange = (value: string) => {
		form.setValue("branchName", value);
		onBranchSelect(value);
	};

	const onSubmit = async (data: RepositoryFormData) => {
		try {
			const repository = await addRepository({
				provider: "gitlab",
				...data,
				// GitLab specific fields with fallbacks
				groupName: selectedGroup?.name || "",
				groupFullName:
					selectedGroup?.full_name || selectedGroup?.name || "",
				groupPath: selectedGroup?.path || "",
				projectName: selectedProject?.name || "",
				projectPath: selectedProject?.path_with_namespace || "",
				projectWebUrl: selectedProject?.web_url || "",
				projectDefaultBranch: selectedProject?.default_branch || "",
				branchProtected: selectedBranch?.protected || false,
				branchWebUrl: selectedBranch?.web_url || "",
			});

			if (repository.id) {
				onSuccess?.();
				// Optionally, you could use a more sophisticated state management
				// instead of window.location.reload()
				window.location.reload();
			}
		} catch (error) {
			console.error("Failed to add repository:", error);
			// You could show a toast notification here
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{error && (
					<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
						{error}
					</div>
				)}

				<FormField
					control={form.control}
					name="groupId"
					render={({ field }) => (
						<FormSelectField
							label="Group"
							placeholder="Select a group"
							description="Select the group that contains the project"
							options={groups}
							isLoading={isLoading && groups.length === 0}
							onValueChange={handleGroupSelectionChange}
							icon={<Blocks className="size-4" />}
							{...field}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name="projectId"
					render={({ field }) => (
						<FormSelectField
							label="Project"
							placeholder="Select a project"
							description="Select the project you want to track"
							options={projects}
							isLoading={isLoading && projects.length === 0}
							onValueChange={handleProjectSelectionChange}
							disabled={!form.watch("groupId")}
							{...field}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name="branchName"
					render={({ field }) => (
						<BranchSelectField
							branches={branches}
							isLoading={isLoading && branches.length === 0}
							onValueChange={handleBranchSelectionChange}
							disabled={!form.watch("projectId")}
							{...field}
						/>
					)}
				/>

				{children}
			</form>
		</Form>
	);
}
