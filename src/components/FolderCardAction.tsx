import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical, HeartIcon, TrashIcon } from "lucide-react";

const FolderCardAction = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary" className="cursor-pointer">
					<EllipsisVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 border-none">
				<DropdownMenuItem className="text-green-500 font-semibold hover:bg-green-100">
					<HeartIcon className="text-green-500" />
					<span>Favorites</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="text-red-500 font-semibold hover:bg-red-100 mt-2">
					<TrashIcon className="text-red-500" />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default FolderCardAction;
