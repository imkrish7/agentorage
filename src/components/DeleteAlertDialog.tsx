import { deleteDocument } from "@/apiService/document";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useTransition, type FC } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

interface IProps {
	documentId: string;
}

export const DeleteAlertDialog: FC<IProps> = ({ documentId }) => {
	const [isPending, startTransition] = useTransition();
	const handleDelete = () => {
		startTransition(async () => {
			try {
				const response = await deleteDocument(documentId);
				if (response) {
					toast.success("Document has been deleted!");
				}
			} catch (error) {
				toast.error(
					`Failed to delete the document: ${JSON.stringify(error)}`,
				);
			}
		});
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button className="flex text-red-600 bg-red-200 hover:bg-red-200 w-full px-2 py-1.5 rounded-md">
					<Trash2Icon />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your document.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						className="bg-red-300 hover:bg-red-300"
						disabled={isPending}
					>
						{isPending && <Spinner />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
