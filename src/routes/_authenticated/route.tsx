import Layout from "@/layouts/protected/layout";
import CenteralServiceProvider from "@/providers/CenteralServiceProvider";
import { DocumentService } from "@/services/documentService";
import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return (
		<DocumentService.Provider>
			<CenteralServiceProvider>
				<Layout />
			</CenteralServiceProvider>
		</DocumentService.Provider>
	);
};

export const Route = createFileRoute("/_authenticated")({
	component: RouteComponent,
});
