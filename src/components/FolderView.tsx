import { type FC } from "react";
import Folders from "./Folders";
import { Button } from "./ui/button";
import type { Folder } from "@/types/folder.types";
import Loader from "./Loader";

interface IProps {
	folders: Folder[];
	isLoading: boolean;
}

const FolderView: FC<IProps> = ({ folders, isLoading }) => {
	return (
		<div className="w-full flex flex-col">
			<div className="flex justify-between">
				<span className="font-bold text-2xl">Folders</span>
				<Button variant={"secondary"} className="cursor-pointer">
					View All
				</Button>
			</div>
			<div className="w-full">
				{isLoading ? <Loader /> : <Folders folders={folders} />}
			</div>
		</div>
	);
};

export default FolderView;
