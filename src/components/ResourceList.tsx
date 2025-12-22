import type { FC } from "react";
import DocumentTile from "./DocumentTile";
import { FolderCard } from "./FolderCard";
import type { Resource } from "@/types/common.types";
import type { IFolderRecord } from "@/types/folder.types";
import type { IDocumentRecord } from "@/types/document.types";

interface IProps {
	resources: Resource[];
}

const ResourceList: FC<IProps> = ({ resources }) => {
	return (
		<div className="flex flex-wrap gap-4">
			{resources.map((resource: Resource) => {
				if ("typeOf" in resource) {
					return (
						<FolderCard
							key={resource._id}
							folder={resource as IFolderRecord}
						/>
					);
				} else {
					return (
						<DocumentTile
							key={resource._id}
							document={resource as IDocumentRecord}
						/>
					);
				}
			})}
		</div>
	);
};

export default ResourceList;
