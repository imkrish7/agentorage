import { getFoldersAction } from "@/apiService/folder";
import DocumentView from "@/components/DocumentView";
import FolderView from "@/components/FolderView";
import Loader from "@/components/Loader";
import { useCenteralServiceState } from "@/services/centeralService";
import type { IDocumentRecord } from "@/types/document.types";
import type { Folder } from "@/types/folder.types";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

const Component = () => {
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [isLoading, startTransition] = useTransition();
	const rootFolder = useCenteralServiceState((state) => state.context.root);

	useEffect(() => {
		startTransition(async () => {
			if (rootFolder) {
				const response = await getFoldersAction(rootFolder);
				setFolders([...response.data.folders]);
				setDocuments([...response.data.documents]);
			}
		});
	}, [rootFolder]);

	return (
		<div className="w-full flex-1 flex flex-col">
			<FolderView isLoading={isLoading} folders={folders} />
			<DocumentView isLoading={isLoading} documents={documents} />
		</div>
	);
};
export const Route = createFileRoute("/_authenticated/dashboard/")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: Component,
	pendingComponent: Loader,
});
