import { createFileRoute } from "@tanstack/react-router";
import Editor from "@/components/Editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute(
	"/_authenticated/documents/$docid/create/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Card className="border-none w-full h-full">
			<CardHeader>
				<CardTitle>New documents</CardTitle>
			</CardHeader>
			<CardContent>
				<Editor />
			</CardContent>
		</Card>
	);
}
