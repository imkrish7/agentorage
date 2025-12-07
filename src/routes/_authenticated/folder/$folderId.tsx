import { getFoldersAction } from "@/apiService/folder";
import DocumentView from "@/components/DocumentView";
import ErrorComponent from "@/components/Error";
import FolderView from "@/components/FolderView";
import Loader from "@/components/Loader";
import type { IDocumentRecord } from "@/types/document.types";
import type { Folder } from "@/types/folder.types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

export const Route = createFileRoute("/_authenticated/folder/$folderId")({
	component: RouteComponent,
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
});

function RouteComponent() {
	const { folderId } = Route.useParams();
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [isLoading, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			if (folderId) {
				try {
					const response = await getFoldersAction(folderId);
					setFolders([...response.data.folders]);
					setDocuments([...response.data.documents]);
				} catch (error) {
					console.error(error);
				}
			}
		});
	}, [folderId]);

	return (
		<div className="w-full flex-1 flex flex-col">
			<FolderView isLoading={isLoading} folders={folders} />
			<DocumentView isLoading={isLoading} documents={documents} />
		</div>
	);
}
