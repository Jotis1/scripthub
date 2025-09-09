"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Blocks, CircleDot, GitBranch } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addRepository } from "@/actions/add-repository";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRepos } from "@/hooks/use-repos";

const formSchema = z.object({
	groupId: z.string().min(1, "Group is required"),
	projectId: z.string().min(1, "Project is required"),
	branchName: z.string().min(1, "Branch is required"),
});

type FormSchema = z.infer<typeof formSchema>;

export function AddRepositoryForm({
	children,
}: {
	children?: React.ReactNode;
}) {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const {
		groups,
		selectGroup,
		projects,
		selectProject,
		branches,
		loading,
		error,
	} = useRepos();

	const onSubmit = async (data: FormSchema) => {
		const repo = await addRepository({ provider: "gitlab", ...data });
		if (repo.id) {
			window.location.reload();
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="groupId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<Blocks className="size-4" />
								Group
							</FormLabel>
							<Select
								onValueChange={(value) => {
									selectGroup({ groupId: Number(value) });
									field.onChange(value);
								}}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a group" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Groups</SelectLabel>
										{loading && (
											<SelectItem value="none">
												Loading...
											</SelectItem>
										)}
										{groups.map((group) => (
											<SelectItem
												key={group.id}
												value={String(group.id)}
											>
												{group.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormDescription>
								Select the group that contains the project
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="projectId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<CircleDot className="size-4" />
								Project
							</FormLabel>
							<Select
								onValueChange={(value) => {
									selectProject({ projectId: Number(value) });
									field.onChange(value);
								}}
							>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a project" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Projects</SelectLabel>
										{loading && (
											<SelectItem value="none">
												Loading...
											</SelectItem>
										)}
										{projects.map((project) => (
											<SelectItem
												key={project.id}
												value={String(project.id)}
											>
												{project.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormDescription>
								Select the group that contains the project
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="branchName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								<GitBranch className="size-4" />
								Branch
							</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select a branch" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Branches</SelectLabel>
										{loading && (
											<SelectItem value="none">
												Loading...
											</SelectItem>
										)}
										{branches.map((branch) => (
											<SelectItem
												key={branch.name}
												value={String(branch.name)}
											>
												{branch.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
							<FormDescription>
								Select the branch you want to track
							</FormDescription>
						</FormItem>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
