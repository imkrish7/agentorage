import { getRecentResourcesdAction } from "@/apiService/recent";
import DocumentView from "@/components/DocumentView";
import ErrorComponent from "@/components/Error";
import FolderView from "@/components/FolderView";
import Loader from "@/components/Loader";
import type { IDocumentRecord } from "@/types/document.types";
import type { Folder } from "@/types/folder.types";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

export const Route = createFileRoute("/_authenticated/recent/")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: RouteComponent,
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
});

function RouteComponent() {
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [isLoading, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			const response = await getRecentResourcesdAction();
			setFolders([...response.data.folders]);
			setDocuments([...response.data.documents]);
		});
	}, []);
	return (
		<div className="w-full flex-1 flex flex-col">
			<FolderView isLoading={isLoading} folders={folders} />
			<DocumentView isLoading={isLoading} documents={documents} />
		</div>
	);
}
