import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import type { FC } from "react";
interface IProps {
	id: string;
}

export const DocumentRowAction: FC<IProps> = ({ id }) => {
	const navigate = useNavigate();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<ChevronRightIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							navigate({ to: `/documents/${id}/view` });
						}}
						className="p-0"
					>
						<span className="flex text-blue-600 hover:bg-blue-200 w-full px-2 py-1.5 rounded-md">
							View
						</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						// onClick={() => {
						// 	alert("Hell is real");
						// }}
						className="p-0"
					>
						<AlertDialogAction />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
