import ErrorComponent from "@/components/Error";
import Loader from "@/components/Loader";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/tags/")({
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
	return <div>Hello "/tags/"!</div>;
}
