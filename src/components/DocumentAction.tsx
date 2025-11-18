"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocumentService } from "@/services/documentService";

export const DocumentAction = () => {
	const documentService = useDocumentService();
	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button className="bg-indigo-300 hover:bg-indigo-400 text-white">
						<PlusIcon className="" />
						Add New
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-40 border-none" align="end">
					<DropdownMenuLabel>Document Actions</DropdownMenuLabel>
					<DropdownMenuGroup>
						<DropdownMenuItem onSelect={() => {}}>
							New File
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={() => {
								documentService.send({
									type: "GOTO_FOLDER",
								});
							}}
						>
							New Folder
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuLabel>Other</DropdownMenuLabel>
						<DropdownMenuItem>New tag</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
