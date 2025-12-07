import DocumentView from "@/components/DocumentView";
import FolderView from "@/components/FolderView";
import Loader from "@/components/Loader";
import {
	createFileRoute,
	ErrorComponent,
	redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/favorites/")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
	component: RouteComponent,
	errorComponent: ErrorComponent,
	pendingComponent: Loader,
});

function RouteComponent() {
	return (
		<div className="w-full flex-1 flex flex-col">
			<FolderView isLoading={false} folders={[]} />
			<DocumentView isLoading={false} documents={[]} />
		</div>
	);
}
