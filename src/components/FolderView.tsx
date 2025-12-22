import { type FC } from "react";
import Folders from "./Folders";
import { Button } from "./ui/button";
import type { IFolderRecord } from "@/types/folder.types";
import Loader from "./Loader";
import { useCenteralServiceState } from "@/services/centeralService";
import { useNavigate } from "@tanstack/react-router";

interface IProps {
	folders: IFolderRecord[];
	isLoading: boolean;
}

const FolderView: FC<IProps> = ({ folders, isLoading }) => {
	const navigate = useNavigate();
	const rootFolder = useCenteralServiceState((state) => state.context.root);
	return (
		<div className="w-full flex flex-col">
			<div className="flex justify-between">
				<span className="font-bold text-2xl">Folders</span>

				<Button
					onClick={() => {
						navigate({
							to: `/folder/${rootFolder}?view=all&resources=folders`,
						});
					}}
					variant={"secondary"}
					className="cursor-pointer"
				>
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
