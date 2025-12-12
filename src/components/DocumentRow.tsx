import { File, Image } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import type { IDocumentRecord } from "@/types/document.types";
import type { FC } from "react";
import { iconHelper } from "@/lib/folder";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { DeleteAlertDialog } from "./DeleteAlertDialog";

interface IProps {
	document: IDocumentRecord;
}

const DocumentRow: FC<IProps> = ({
	document: { filename, mime, createdAt, _id },
}) => {
	const navigate = useNavigate();
	return (
		<div className="flex w-full flex-col gap-6">
			<Item variant="outline" className="w-full bg-gray-200/50">
				<ItemMedia className="">
					<Avatar className="size-10 bg-gray-200 flex items-center justify-center">
						{iconHelper(mime) === "image" ? (
							<Image className="text-green-400" />
						) : (
							<File className="text-violet-400" />
						)}
					</Avatar>
				</ItemMedia>
				<ItemContent>
					<ItemTitle className="text-white">{filename}</ItemTitle>
					<ItemDescription>
						Created At: {new Date(createdAt).toDateString()}
					</ItemDescription>
				</ItemContent>
				<ItemActions className="">
					{/* <DocumentRowAction id={_id} /> */}
					<Button
						onClick={() => {
							navigate({
								to: `/documents/${_id}/view?viewer=${iconHelper(mime) == "image" ? "image" : "pdf"}`,
							});
						}}
						variant={"secondary"}
					>
						View
					</Button>
					<div>
						<DeleteAlertDialog documentId={_id} />
					</div>
				</ItemActions>
			</Item>
		</div>
	);
};

export default DocumentRow;
