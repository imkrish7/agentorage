import { getFoldersAction } from "@/apiService/folder";
import DocumentView from "@/components/DocumentView";
import ErrorComponent from "@/components/Error";
import FolderView from "@/components/FolderView";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useCenteralServiceState } from "@/services/centeralService";
import type { IDocumentRecord } from "@/types/document.types";
import type { IFolderRecord } from "@/types/folder.types";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

const Component = () => {
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [folders, setFolders] = useState<IFolderRecord[]>([]);
	const [isLoading, startTransition] = useTransition();
	const navigate = useNavigate();
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
			<div className="w-full flex justify-end mb-2">
				<Button
					onClick={() => {
						navigate({
							to: `/folder/${rootFolder}?view=all&&resources=all`,
						});
					}}
					variant={"outline"}
					className="border-white"
				>
					View All Resources
				</Button>
			</div>
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
	errorComponent: ErrorComponent,
});
