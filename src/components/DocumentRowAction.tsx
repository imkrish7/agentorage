import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
					>
						View
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
