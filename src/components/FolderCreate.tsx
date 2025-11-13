import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useDocumentService } from "@/services/documentService";
import { FolderList } from "./FolderList";

const FolderCreate = () => {
	const documentService = useDocumentService();
	return (
		<Dialog open={true}>
			<form>
				<DialogContent
					showCloseButton={false}
					className="sm:max-w-[425px] border-none bg-white/80 backdrop-blur-4xl"
				>
					<DialogHeader>
						<DialogTitle>Create Folder</DialogTitle>
						<DialogDescription>
							You can create a new folder or select an existing
							one to make it a subfolder. When no folder is
							selected, it will be created in the root directory
							by default.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="username-1">Folders</Label>
							<FolderList />
						</div>
						<div className="grid gap-3">
							<Label htmlFor="name-1">Name</Label>
							<Input
								id="name-1"
								name="name"
								defaultValue="Pedro Duarte"
								placeholder="Folder name..."
								className="bg-white/80"
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								onClick={() => {
									documentService.send({
										type: "CANCEL",
									});
								}}
								variant="outline"
								className="border-white border-2 cursor-pointer"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							className="bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
						>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default FolderCreate;
