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
import {
	useDocumentService,
	useDocumentServiceState,
} from "@/services/documentService";
import { FolderList } from "./FolderList";
import { Label } from "./ui/label";
import { useState, useTransition } from "react";
import { UploadFile } from "./UploadFile";
import { DocumentUploadRow } from "./DocumentUploadRow";
import { toast } from "sonner";
import {
	getUploadDocumentPresignedURL,
	updateUploadStatus,
	uploadDocument,
} from "@/apiService/document";

const DocumentCreate = () => {
	const [parentId, setParentId] = useState<string>("");
	const [isPending, startTransition] = useTransition();
	const [files, setFiles] = useState<File[]>([]);
	const folderList = useDocumentServiceState(
		(state) => state.context.folders,
	);
	const documentService = useDocumentService();

	const handleFolderChange = (folderId: string) => {
		setParentId(folderId);
		console.log(parentId);
	};

	const removeFile = (filename: string) => {
		if (isPending) {
			toast.error("Please wait!");
		} else {
			setFiles((prev) => prev.filter((file) => file.name !== filename));
		}
	};

	const handleUpload = () => {
		if (!parentId) {
			toast.error("Please select a folder!");
		} else {
			startTransition(async () => {
				let presignedURLResponse, uploadStatus;
				try {
					presignedURLResponse = await getUploadDocumentPresignedURL(
						parentId,
						files[0].name,
						files[0].type,
					);
					uploadStatus = await uploadDocument(
						presignedURLResponse.data.presignedURL,
						files[0],
					);
					if (uploadStatus) {
						toast.success("File upload completed!");
						await updateUploadStatus(
							presignedURLResponse.data.docid,
							"UPLOADED",
							parentId,
						);
					} else {
						await updateUploadStatus(
							presignedURLResponse.data.docid,
							"FAILED",
							parentId,
						);
						toast.error("File failed to upload, Please try again!");
					}
				} catch (error) {
					if (presignedURLResponse && !uploadStatus) {
						// update failed status
						await updateUploadStatus(
							presignedURLResponse.data.docid,
							"FAILED",
							parentId,
						);
						// toast.error("File failed to upload, Please try again!");
					}
					console.error(error);
					toast.error("Failed to upload file!");
				} finally {
					documentService.send({
						type: "CANCEL",
					});
				}
			});
		}
	};

	return (
		<Dialog open={true}>
			<DialogContent
				showCloseButton={false}
				className="md:w-3xl border-none bg-indigo-100 backdrop-blur-4xl"
			>
				<DialogHeader>
					<DialogTitle>Create Document</DialogTitle>
					<DialogDescription>
						You can create a new document in root folder or select
						an existing folder. When no foldler is selected, it will
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
				<div className="grid gap-4">
					{files.length > 0 ? (
						files.map((file, index) => {
							return (
								<DocumentUploadRow
									key={index}
									filename={file.name}
									mime={file.type}
									handleRemove={removeFile}
									uploading={isPending}
								/>
							);
						})
					) : (
						<UploadFile setFiles={setFiles} />
					)}

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
							onClick={handleUpload}
							disabled={isPending}
							type="submit"
							className="bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
						>
							Create File
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DocumentCreate;
