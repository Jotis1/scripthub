import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { RepositoryForm } from "@/components/forms/repository-form";
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

export function RepositoryDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline">
					<Plus className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-md">
				<DialogHeader>
					<DialogTitle>Add New Repository</DialogTitle>
					<DialogDescription>
						Select the repository you want to add to the
						application.
					</DialogDescription>
				</DialogHeader>
				<RepositoryForm>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Add Repository</Button>
					</DialogFooter>
				</RepositoryForm>
			</DialogContent>
		</Dialog>
	);
}
