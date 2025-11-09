import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/features/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Features</div>;
}
