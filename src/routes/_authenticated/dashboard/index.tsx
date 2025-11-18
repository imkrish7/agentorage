import { getFoldersAction } from "@/apiService/folder";
import DocumentRow from "@/components/DocumentRow";
import Folders from "@/components/Folders";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useCenteralServiceState } from "@/services/centeralService";
import type { Folder } from "@/types/folder.types";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useTransition } from "react";

const Component = () => {
	const [folders, setFolders] = useState<Folder[]>([]);
	const [isLoading, startTransition] = useTransition();
	const rootFolder = useCenteralServiceState((state) => state.context.root);
	console.log(rootFolder);

	useEffect(() => {
		startTransition(async () => {
			if (rootFolder) {
				const response = await getFoldersAction(rootFolder);
				setFolders([...response.data.folders]);
			}
		});
	}, [rootFolder]);

	console.log(isLoading);

	return (
		<div className="w-full flex-1 flex flex-col">
			<div className="w-full flex flex-col">
				<div className="flex justify-between">
					<span className="font-bold text-2xl">Folders</span>
					<Button variant={"secondary"}>View All</Button>
				</div>
				<div className="w-full">
					{isLoading ? <Loader /> : <Folders folders={folders} />}
				</div>
			</div>
			<div className="flex flex-col flex-1 mt-10 w-full gap-2">
				{[1, 2, 3, 4, 5, 6].map((item) => {
					return <DocumentRow key={item} />;
				})}
			</div>
		</div>
	);
};
export const Route = createFileRoute("/_authenticated/dashboard/")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: Component,
	pendingComponent: Loader,
});
