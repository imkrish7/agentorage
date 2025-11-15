"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { startTransition, useState, type FC } from "react";
import type { Folder } from "@/types/folder.types";

interface IProps {
	folders: Folder[];
	handleChange: (folderId: string) => void;
}
export const FolderList: FC<IProps> = ({ folders, handleChange }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between border-none bg-white/50"
				>
					{value
						? folders.find((folder) => folder._id === value)?.alias
						: "Select folder..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className=" border-none"
				style={{
					width: "100%",
				}}
			>
				<Command className="w-full border-none">
					<CommandInput
						placeholder="Search folder..."
						className="h-9"
					/>
					<CommandList className="w-full border-none">
						<CommandEmpty>No framework found.</CommandEmpty>
						<CommandGroup className="w-full border-none">
							{folders.length > 0 &&
								folders.map((folder) => (
									<CommandItem
										key={folder._id}
										value={folder._id}
										title={folder.alias}
										onSelect={(currentValue) => {
											startTransition(() => {
												setValue(
													currentValue === value
														? ""
														: currentValue,
												);
												handleChange(currentValue);
												setOpen(false);
											});
										}}
									>
										{folder.alias}
										<Check
											className={cn(
												"ml-auto",
												value === folder._id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
