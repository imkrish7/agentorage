import Layout from "@/layouts/protected/layout";
import { DocumentService } from "@/services/documentService";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return (
		<DocumentService.Provider>
			<Layout />
		</DocumentService.Provider>
	);
};

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});
