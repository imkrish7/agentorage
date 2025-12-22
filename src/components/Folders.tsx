import type { IFolderRecord } from "@/types/folder.types";
import { FolderCard } from "./FolderCard";
import type { FC } from "react";

interface IProps {
	folders: IFolderRecord[];
}

const Folders: FC<IProps> = ({ folders }) => {
	return (
		<div className="w-full py-2">
			<div className="grid auto-cols-auto grid-flow-col grid-rows-1 w-full gap-2 sm:justify-start justify-center overflow-x-scroll">
				{folders.map((folder, index) => (
					<FolderCard key={index} folder={folder} />
				))}
			</div>
		</div>
	);
};

export default Folders;
