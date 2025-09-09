import {
	ExternalLink,
	FileCode2,
	MoreVertical,
	Power,
	PowerOff,
	Trash2,
} from "lucide-react";
import { ScriptEndpointCard } from "./script-endpoint-card";
import { fetchScriptEndpointsByRepository } from "@/actions/script-actions";

interface ScriptEndpointsListProps {
	repositoryId: string;
}

export async function ScriptEndpointsList({
	repositoryId,
}: ScriptEndpointsListProps) {
	const endpoints = await fetchScriptEndpointsByRepository(repositoryId);

	if (endpoints.length === 0) {
		return (
			<div className="text-center py-8 border border-dashed border-border rounded-lg">
				<FileCode2 className="size-8 mx-auto mb-2 text-muted-foreground" />
				<p className="text-muted-foreground text-sm">
					No script endpoints configured yet.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{endpoints.map((endpoint) => (
				<ScriptEndpointCard key={endpoint.id} endpoint={endpoint} />
			))}
		</div>
	);
}
