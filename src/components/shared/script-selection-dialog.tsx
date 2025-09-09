"use client";

import { DialogClose } from "@radix-ui/react-dialog";
import { FileCode2, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ScriptSelectionForm } from "@/components/forms/script-selection-form";

interface ScriptSelectionDialogProps {
	repositoryId: string;
}

export function ScriptSelectionDialog({
	repositoryId,
}: ScriptSelectionDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	const handleSuccess = () => {
		setIsOpen(false);
		router.refresh();
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="sm" className="gap-2">
					<Plus className="size-4" />
					Add Script Endpoint
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<FileCode2 className="size-5" />
						Select PowerShell Scripts
					</DialogTitle>
					<DialogDescription>
						Select one or more PowerShell files from the repository
						and configure their serving paths.
					</DialogDescription>
				</DialogHeader>
				<ScriptSelectionForm
					repositoryId={repositoryId}
					onSuccess={handleSuccess}
				>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Create Endpoints</Button>
					</DialogFooter>
				</ScriptSelectionForm>
			</DialogContent>
		</Dialog>
	);
}
