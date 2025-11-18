import type { Folder } from "@/types/folder.types";
import { FolderCard } from "./FolderCard";
import type { FC } from "react";

interface IProps {
	folders: Folder[];
}

const Folders: FC<IProps> = ({ folders }) => {
	return (
		<div className="w-full py-2">
			<div className="flex overflow-x-auto gap-2">
				{folders.map((folder, index) => (
					<FolderCard
						key={index}
						folder={folder}
						className="-z-[1000]"
					/>
				))}
			</div>
		</div>
	);
};

export default Folders;
