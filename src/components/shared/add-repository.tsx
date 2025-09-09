import { DialogClose } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { AddRepositoryForm } from "@/components/forms/add-repository";
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

export function AddRepository() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" variant="outline">
					<Plus className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-md">
				<DialogHeader>
					<DialogTitle>Adding a new repository</DialogTitle>
					<DialogDescription>
						Select the repository you want to add to the
						application.
					</DialogDescription>
				</DialogHeader>
				<AddRepositoryForm>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Add Repository</Button>
					</DialogFooter>
				</AddRepositoryForm>
			</DialogContent>
		</Dialog>
	);
}
