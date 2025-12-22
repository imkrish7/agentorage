import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/view/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.isAuthorized) {
			throw redirect({
				to: "/login",
			});
		}
	},
});

function RouteComponent() {
	return <div>Hello "/_authenticated/dashboard/view/"!</div>;
}
