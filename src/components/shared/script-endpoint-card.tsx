"use client";

import {
	ExternalLink,
	FileCode2,
	Lock,
	MoreVertical,
	Power,
	PowerOff,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
	deleteScriptEndpoint,
	toggleScriptEndpointStatus,
} from "@/actions/script-actions";
import type { ScriptEndpointWithRepository } from "@/types/script";

interface ScriptEndpointCardProps {
	endpoint: ScriptEndpointWithRepository;
}

export function ScriptEndpointCard({ endpoint }: ScriptEndpointCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleToggleStatus = async () => {
		setIsLoading(true);
		try {
			await toggleScriptEndpointStatus(endpoint.id, !endpoint.isActive);
			router.refresh();
		} catch (error) {
			console.error("Failed to toggle endpoint status:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!confirm("Are you sure you want to delete this endpoint?")) {
			return;
		}

		setIsLoading(true);
		try {
			await deleteScriptEndpoint(endpoint.id);
			router.refresh();
		} catch (error) {
			console.error("Failed to delete endpoint:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopyUrl = () => {
		let url = `${window.location.origin}${endpoint.servePath}`;

		// If auth is required, show the basic auth format
		if (endpoint.requiresAuth && endpoint.username) {
			const host = window.location.host;
			url = `https://${endpoint.username}:****@${host}${endpoint.servePath}`;
		}

		navigator.clipboard.writeText(url);
		// In a real app, you'd show a toast notification
	};

	const handleOpenUrl = () => {
		const url = `${window.location.origin}${endpoint.servePath}`;
		window.open(url, "_blank");
	};

	return (
		<Card className="transition-colors hover:bg-muted/50">
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<FileCode2 className="size-5 text-muted-foreground" />
						<div>
							<div className="font-medium">
								{endpoint.filePath.split("/").pop()}
							</div>
							<div className="text-sm text-muted-foreground">
								{endpoint.filePath}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<Badge
							variant={
								endpoint.isActive ? "default" : "secondary"
							}
						>
							{endpoint.isActive ? "Active" : "Inactive"}
						</Badge>
						{endpoint.requiresAuth && (
							<Badge
								variant="outline"
								className="text-yellow-600 border-yellow-600"
							>
								<Lock className="size-3 mr-1" />
								Protected
							</Badge>
						)}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									disabled={isLoading}
								>
									<MoreVertical className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={handleCopyUrl}>
									<ExternalLink className="size-4 mr-2" />
									Copy URL
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleOpenUrl}>
									<ExternalLink className="size-4 mr-2" />
									Open in Browser
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleToggleStatus}>
									{endpoint.isActive ? (
										<>
											<PowerOff className="size-4 mr-2" />
											Deactivate
										</>
									) : (
										<>
											<Power className="size-4 mr-2" />
											Activate
										</>
									)}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={handleDelete}
									className="text-red-600"
								>
									<Trash2 className="size-4 mr-2" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<div className="text-muted-foreground">
							Serves at:{" "}
							<code className="bg-muted px-1 py-0.5 rounded text-xs">
								{endpoint.servePath}
							</code>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={handleCopyUrl}
							className="h-7 text-xs"
						>
							Copy URL
						</Button>
					</div>
					{endpoint.requiresAuth && endpoint.username && (
						<div className="text-xs text-muted-foreground flex items-center gap-1">
							<Lock className="size-3" />
							Authentication required • Username:{" "}
							<code className="bg-muted px-1 py-0.5 rounded">
								{endpoint.username}
							</code>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
