import { getFoldersAction } from "@/apiService/folder";
import DocumentTile from "@/components/DocumentTile";
import ErrorComponent from "@/components/Error";
import { FolderCard } from "@/components/FolderCard";
import Loader from "@/components/Loader";
import ResourceList from "@/components/ResourceList";
import { Spinner } from "@/components/ui/spinner";
import type { Resource } from "@/types/common.types";
import type { IDocumentRecord } from "@/types/document.types";
import type { IFolderRecord } from "@/types/folder.types";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

interface DocumentSearch {
	view: string;
	resources: "folders" | "documents" | string;
}

export const Route = createFileRoute("/_authenticated/folder/$folderId")({
	component: RouteComponent,
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
	validateSearch: (search: Record<string, string>): DocumentSearch => {
		return {
			view: search.viewer,
			resources: search.resources,
		};
	},
});

function RouteComponent() {
	const { folderId } = Route.useParams();
	const { view, resources } = Route.useSearch();
	const [documents, setDocuments] = useState<IDocumentRecord[]>([]);
	const [folders, setFolders] = useState<IFolderRecord[]>([]);
	const [resourceList, setResourceList] = useState<Resource[]>([]);
	const [isLoading, startTransition] = useTransition();

	useEffect(() => {
		startTransition(async () => {
			if (folderId) {
				try {
					const response = await getFoldersAction(folderId, {
						view,
						resources,
					});

					if (resources === "all") {
						setResourceList([...response.data.resourceList]);
					} else if (resources === "folders") {
						setFolders([...response.data.folders]);
					} else if (resources === "documents") {
						setDocuments([...response.data.documents]);
					} else {
						setFolders([...response.data.folders]);
						setDocuments([...response.data.documents]);
					}
				} catch (error) {
					console.error(error);
				}
			}
		});
	}, [folderId, view, resources]);
	console.log(documents, folders);

	return (
		<div className="w-full flex-1 flex flex-col">
			{isLoading && <Spinner />}
			{!isLoading && resources === "all" && (
				<ResourceList resources={resourceList} />
			)}
			{!isLoading && resources === "folders" && (
				<div className="flex flex-wrap gap-2">
					{folders.map((folder) => {
						return <FolderCard key={folder._id} folder={folder} />;
					})}
				</div>
			)}
			{!isLoading && resources === "documents" && (
				<div className="flex flex-wrap gap-2">
					{documents.map((document) => {
						return (
							<DocumentTile
								key={document._id}
								document={document}
							/>
						);
					})}
				</div>
			)}
			{/* {isLoading ? (
				resourceList.length == 0 ? (
					<>
						<FolderView isLoading={isLoading} folders={folders} />
						<DocumentView
							isLoading={isLoading}
							documents={documents}
						/>
					</>
				) : (
					<div>Resources</div>
				)
			) : (
				<div>something went wrong</div>
			)} */}
		</div>
	);
}
