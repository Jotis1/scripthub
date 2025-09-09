"use client";

import { GitBranch } from "lucide-react";
import { forwardRef } from "react";
import {
	FormControl,
	FormDescription,
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
import type { GitLabBranch } from "@/types/gitlab";

interface BranchSelectFieldProps {
	branches: GitLabBranch[];
	isLoading: boolean;
	onValueChange: (value: string) => void;
	disabled?: boolean;
}

export const BranchSelectField = forwardRef<
	HTMLButtonElement,
	BranchSelectFieldProps
>(({ branches, isLoading, onValueChange, disabled = false }, ref) => {
	return (
		<FormItem>
			<FormLabel className="flex items-center gap-2">
				<GitBranch className="size-4" />
				Branch
			</FormLabel>
			<Select
				onValueChange={onValueChange}
				disabled={disabled || isLoading}
			>
				<FormControl>
					<SelectTrigger className="w-full" ref={ref}>
						<SelectValue placeholder="Select a branch" />
					</SelectTrigger>
				</FormControl>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Branches</SelectLabel>
						{isLoading ? (
							<SelectItem value="loading" disabled>
								Loading branches...
							</SelectItem>
						) : branches.length === 0 ? (
							<SelectItem value="empty" disabled>
								No branches available
							</SelectItem>
						) : (
							branches.map((branch) => (
								<SelectItem
									key={branch.name}
									value={branch.name}
								>
									<span className="flex items-center gap-2">
										{branch.name}
										{branch.default && (
											<span className="text-xs text-muted-foreground">
												(default)
											</span>
										)}
									</span>
								</SelectItem>
							))
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
			<FormDescription>
				Select the branch you want to track
			</FormDescription>
		</FormItem>
	);
});

BranchSelectField.displayName = "BranchSelectField";
