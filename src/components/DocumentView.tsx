import type { IDocumentRecord } from "@/types/document.types";
import DocumentRow from "./DocumentRow";
import type { FC } from "react";
import Loader from "./Loader";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useCenteralServiceState } from "@/services/centeralService";

interface IProps {
	documents: IDocumentRecord[];
	isLoading: boolean;
}

const DocumentView: FC<IProps> = ({ documents, isLoading }) => {
	const navigate = useNavigate();
	const rootFolder = useCenteralServiceState((state) => state.context.root);
	return (
		<div className="flex flex-col flex-1 mt-10 w-full gap-2">
			<div className="flex w-full justify-between">
				<div>
					<span className="text-2xl font-bold">Documents</span>
				</div>
				<Button
					onClick={() => {
						navigate({
							to: `/folder/${rootFolder}?view=all&resources=documents`,
						});
					}}
					variant={"outline"}
					className="border-none cursor-pointer shadow-sm shadow-gray-100/10"
				>
					View All
				</Button>
			</div>
			<div className="flex flex-col flex-1 gap-2">
				{isLoading ? (
					<Loader />
				) : documents.length > 0 ? (
					documents.map((document) => {
						return (
							<DocumentRow
								key={document._id}
								document={document}
							/>
						);
					})
				) : (
					<span className="text-lg font-bold">
						No documents available
					</span>
				)}
			</div>
		</div>
	);
};

export default DocumentView;
