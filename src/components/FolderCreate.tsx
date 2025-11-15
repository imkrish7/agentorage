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
import {
	useDocumentService,
	useDocumentServiceState,
} from "@/services/documentService";
import { FolderList } from "./FolderList";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFolderSchema } from "@/schemas/documentActions";
import { Field, FieldError, FieldLabel } from "./ui/field";
import z from "zod";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

const FolderCreate = () => {
	const [parentId, setParentId] = useState<string>("");
	const form = useForm<z.infer<typeof createFolderSchema>>({
		resolver: zodResolver(createFolderSchema),
		defaultValues: {
			name: "",
		},
	});
	const folderList = useDocumentServiceState(
		(state) => state.context.folders,
	);
	const documentService = useDocumentService();

	const handleFolderChange = (folderId: string) => {
		setParentId(folderId);
	};

	const handleFolderSubmit = (data: z.infer<typeof createFolderSchema>) => {
		if (parentId.length === 0) {
			toast.error("Please select a folder!");
		}
		documentService.send({
			type: "CREATE_FOLDER",
			folder: { ...data, parentId },
		});
	};
	return (
		<Dialog open={true}>
			<DialogContent
				showCloseButton={false}
				className="sm:max-w-[425px] border-none bg-white/80 backdrop-blur-4xl"
			>
				<DialogHeader>
					<DialogTitle>Create Folder</DialogTitle>
					<DialogDescription>
						You can create a new folder or select an existing one to
						make it a subfolder. When no folder is selected, it will
						be created in the root directory by default.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap -4">
					<div className="grid gap-3">
						<Label htmlFor="folder">Folders</Label>
						<FolderList
							handleChange={handleFolderChange}
							folders={folderList}
						/>
					</div>
				</div>
				<form
					onSubmit={form.handleSubmit(handleFolderSubmit)}
					className="grid gap-4"
				>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => {
							return (
								<Field {...field}>
									<FieldLabel>Name</FieldLabel>
									<Input
										id="name-1"
										name="name"
										placeholder="Folder name..."
										className="bg-white/80"
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[fieldState.error]}
										/>
									)}
								</Field>
							);
						}}
					/>

					<DialogFooter className="flex flex-end">
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
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FolderCreate;
