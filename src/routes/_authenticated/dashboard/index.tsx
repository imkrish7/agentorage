import DocumentRow from "@/components/DocumentRow";
import { FolderCard } from "@/components/FolderCard";
import { createFileRoute, redirect } from "@tanstack/react-router";

const Component = () => {
	return (
		<div className="flex-1 flex flex-col">
			<div className="flex flex-col">
				<span className="font-bold text-2xl">Folders</span>
				<div className="mt-2">
					<FolderCard />
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
});
