import { iconHelper } from "@/lib/folder";
import type { IDocumentRecord } from "@/types/document.types";
import { useNavigate } from "@tanstack/react-router";
import { FileImageIcon, Notebook } from "lucide-react";
import type { FC } from "react";

interface IProps {
	document: IDocumentRecord;
}

const DocumentTile: FC<IProps> = ({ document }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				navigate({
					to: `/documents/${document._id}/view?viewer=${iconHelper(document.mime) == "image" ? "image" : "pdf"}`,
				});
			}}
			className="h-60 w-50 bg-white rounded-md flex justify-center items-center flex-col gap-2 p-2"
		>
			{iconHelper(document.mime ?? "image") === "image" ? (
				<FileImageIcon className="size-16 text-amber-300" />
			) : (
				<Notebook className="size-16 text-blue-300" />
			)}
			<span className="text-gray-600 font-semibold">
				{document.filename}
			</span>
		</div>
	);
};

export default DocumentTile;
