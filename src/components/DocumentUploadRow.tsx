import { FileImage, FileText, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import type { FC } from "react";
import { Spinner } from "./ui/spinner";
import { iconHelper } from "@/lib/folder";

interface IProps {
	filename: string;
	mime: string;
	handleRemove: (filename: string) => void;
	uploading: boolean;
}

export const DocumentUploadRow: FC<IProps> = ({
	filename,
	mime,
	handleRemove,
	uploading,
}) => {
	return (
		<div className="flex w-full max-w-lg flex-col gap-6">
			<Item
				variant="outline"
				className="bg-violet-100/50 backdrop-blur-2xl border-violet-400"
			>
				<ItemMedia variant="icon">
					{iconHelper(mime) === "document" ? (
						<FileText />
					) : (
						<FileImage />
					)}
				</ItemMedia>
				<ItemContent>
					<ItemTitle>{filename}</ItemTitle>
					<ItemDescription>{iconHelper(mime)}</ItemDescription>
				</ItemContent>
				<ItemActions>
					{uploading ? (
						<Spinner />
					) : (
						<Button
							onClick={() => handleRemove(filename)}
							size="sm"
							variant="outline"
							className="bg-red-400/50 text-red-600 hover:bg-red-400/60 cursor-pointer hover:text-red-500"
						>
							<TrashIcon />
						</Button>
					)}
				</ItemActions>
			</Item>
		</div>
	);
};
