"use client";

import { FileText, Folder, Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useErrorHandler } from "@/hooks/use-error-handler";
import type { GitLabTreeItem } from "@/types/gitlab";
import type { PowerShellFile } from "@/types/script";

interface ScriptSelectionFormProps {
	repositoryId: string;
	onSuccess?: () => void;
	children?: React.ReactNode;
}

export function ScriptSelectionForm({
	repositoryId,
	onSuccess,
	children,
}: ScriptSelectionFormProps) {
	const [files, setFiles] = useState<PowerShellFile[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { error, handleError, clearError } = useErrorHandler();

	const fetchPowerShellFiles = useCallback(async () => {
		try {
			setIsLoading(true);
			clearError();

			const response = await fetch(
				`/api/repositories/${repositoryId}/files`,
			);

			if (!response.ok) {
				throw new Error("Failed to fetch repository files");
			}

			const treeItems: GitLabTreeItem[] = await response.json();

			// Filter for PowerShell files
			const psFiles = treeItems
				.filter(
					(item) =>
						item.type === "blob" &&
						item.name.toLowerCase().endsWith(".ps1"),
				)
				.map((item) => ({
					id: item.id,
					name: item.name,
					path: item.path,
					selected: false,
					customPath: `/api/scripts/${item.name.replace(".ps1", "")}`,
				}));

			setFiles(psFiles);
		} catch (err) {
			handleError(err);
		} finally {
			setIsLoading(false);
		}
	}, [repositoryId, clearError, handleError]);

	useEffect(() => {
		fetchPowerShellFiles();
	}, [fetchPowerShellFiles]);

	const handleFileToggle = (fileId: string) => {
		setFiles((prev) =>
			prev.map((file) =>
				file.id === fileId
					? { ...file, selected: !file.selected }
					: file,
			),
		);
	};

	const handleCustomPathChange = (fileId: string, customPath: string) => {
		let normalizedPath = customPath;

		if (!normalizedPath.startsWith("/api/scripts/")) {
			normalizedPath = "/api/scripts/";
		}

		setFiles((prev) =>
			prev.map((file) =>
				file.id === fileId
					? { ...file, customPath: normalizedPath }
					: file,
			),
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const selectedFiles = files.filter((file) => file.selected);
		if (selectedFiles.length === 0) {
			handleError(new Error("Please select at least one file"));
			return;
		}

		try {
			clearError();

			const createPromises = selectedFiles.map((file) =>
				fetch("/api/script-endpoints", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						repositoryId,
						filePath: file.path,
						servePath: file.customPath,
					}),
				}),
			);

			const results = await Promise.all(createPromises);

			// Check if any requests failed
			const failures = results.filter((r) => !r.ok);
			if (failures.length > 0) {
				throw new Error(
					`Failed to create ${failures.length} endpoint(s)`,
				);
			}

			onSuccess?.();
		} catch (err) {
			handleError(err);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="size-6 animate-spin" />
				<span className="ml-2">Loading PowerShell files...</span>
			</div>
		);
	}

	if (files.length === 0) {
		return (
			<div className="text-center py-8 border border-dashed border-border rounded-lg">
				<FileText className="size-8 mx-auto mb-2 text-muted-foreground" />
				<p className="text-muted-foreground">
					No PowerShell files (.ps1) found in this repository.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{error && (
				<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
					{error}
				</div>
			)}

			<div className="space-y-4">
				<Label className="text-base font-medium">
					PowerShell Files ({files.length} found)
				</Label>

				<div className="max-h-96 overflow-y-auto space-y-3 border rounded-md p-4">
					{files.map((file) => (
						<div
							key={file.id}
							className={`border rounded-lg p-4 transition-colors ${
								file.selected
									? "border-primary bg-primary/5"
									: "border-border"
							}`}
						>
							<div className="flex items-start gap-3">
								<input
									type="checkbox"
									checked={file.selected}
									onChange={() => handleFileToggle(file.id)}
									className="mt-1"
								/>
								<div className="flex-1 space-y-3">
									<div className="flex items-center gap-2">
										<FileText className="size-4 text-muted-foreground" />
										<span className="font-medium">
											{file.name}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm text-muted-foreground">
										<Folder className="size-3" />
										{file.path}
									</div>
									{file.selected && (
										<div className="space-y-1">
											<Label
												htmlFor={`path-${file.id}`}
												className="text-sm"
											>
												Serve Path
											</Label>
											<div className="relative">
												<Input
													id={`path-${file.id}`}
													value={file.customPath}
													onChange={(e) =>
														handleCustomPathChange(
															file.id,
															e.target.value,
														)
													}
													placeholder="/api/scripts/my-script"
													className="text-sm font-mono"
												/>
											</div>
											<p className="text-xs text-muted-foreground">
												This script will be available
												at: {window.location.origin}
												{file.customPath}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{children && <div className="flex justify-between">{children}</div>}
		</form>
	);
}
